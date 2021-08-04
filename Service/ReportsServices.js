const mongoose = require("mongoose");
const { CreateAccountModel } = require("../Models/Accounts");
const GeneralJournalModel = require("../Models/GeneralJournalModel");
const { all } = require("../Routes");
const {
  ACCOUNT_TYPES,
  getBalanceOfAccount,
  getBalance,
} = require("../Utils/Scripts");

const generalJournalService = async (_req, res) => {
  // Accounts to add aggregate all accounts to one place
  let allEntries = [];

  // Get All Entries from GJ Table
  try {
    allEntries = await GeneralJournalModel.find({});
  } catch (err) {
    console.log({ err });
    return res
      .status(500)
      .send("Error occured while getting accounts from remote DB");
  }

  try {
    return res.json({
      data: allEntries,
    });
  } catch (err) {
    res.json({ err });
  }
};

const trialBalanceService = async (req, res) => {
  let allEntries = [];
  let creditAccounts = [];
  let debitAccounts = [];
  let debitAccountsSum = 0;
  let creditAccountsSum = 0;
  let groupedCreditAccount = {};
  let groupedDebitAccount = {};
  // Get All Entries from GJ Table
  try {
    allEntries = await GeneralJournalModel.find({});
  } catch (err) {
    console.log({ err });
    return res
      .status(500)
      .send("Error occured while getting accounts from remote DB");
  }
  try {
    creditAccounts = allEntries.filter(
      ({ accountType }) =>
        accountType !== ACCOUNT_TYPES.ASSETS ||
        accountType !== ACCOUNT_TYPES.EXPENSE
    );
    debitAccounts = allEntries.filter(
      ({ accountType }) =>
        accountType == ACCOUNT_TYPES.ASSETS ||
        accountType == ACCOUNT_TYPES.EXPENSE
    );
    creditAccountsSum = creditAccounts.reduce(
      (acc, current) => acc + getBalance(current, false, true),
      0
    );
    debitAccountsSum = debitAccounts.reduce(
      (acc, current) => acc + getBalance(current, true, false),
      0
    );

    // callback for reduce
    const callBackForGroupedAccounts = (acc, current) => {
      acc[current.accountName] = [...(acc[current.accountName] || []), current];
      return acc;
    };

    // A helper method to transform accounts grouped
    const transformGroupedAccounts = (accounts, isDebit, isCredit) => {
      console.log(accounts);
      Object.keys(accounts).forEach((key) => {
        const balance = getBalanceOfAccount(accounts[key], isDebit, isCredit);
        const accountName = accounts[key][0]["accountName"];

        accounts[key] = { accountName, balance };
      });
    };

    groupedCreditAccount = creditAccounts.reduce(
      callBackForGroupedAccounts,
      {}
    );
    groupedDebitAccount = debitAccounts.reduce(callBackForGroupedAccounts, {});

    // transforming Credit Accounts

    transformGroupedAccounts(groupedCreditAccount, false, true);

    // transforming Debit Accounts

    transformGroupedAccounts(groupedDebitAccount, true, false);

    const responsePayload = {
      creditAccountsSum,
      debitAccountsSum,
      creditAccountsDetails: groupedCreditAccount,
      debitAccountsDetails: groupedDebitAccount,
    };

    res.json(responsePayload);
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

const financeReportsService = async (req, res) => {
  let allEntries = [];

  let revenueAccounts;
  let expenseAccounts;
  let expenseAccountSum = 0;
  let revenueAccountSum = 0;
  let netIncome = 0;

  // Get All Entries from GJ Table
  try {
    allEntries = await GeneralJournalModel.aggregate([
      // filtering the documents # 1st stage
      {
        $match: { accountType: { $in: ["Revenue", "Expense"] } },
      },
      {
        $group: {
          _id: "$accountName",
          creditSum: { $sum: "$creditAmount" },
          debitSum: { $sum: "$debitAmount" },
          accountName: { $last: "$accountName" },
          accountType: { $last: "$accountType" },
        },
      },
      // TODO --> Need to verify how to grouped and then project or map
    ]);
  } catch (err) {
    console.log({ err });
    return res
      .status(500)
      .send("Error occured while getting accounts from remote DB");
  }
  try {
    // get accounts with thier balance
    console.log(allEntries);
    revenueAccounts = allEntries.filter(({ accountType }) => accountType === ACCOUNT_TYPES.REVENUE)
      .map((account) => ({
        ...account,
        balance: account.creditSum - account.debitSum,
      }));
    expenseAccounts = allEntries
      .filter(({ accountType }) => accountType === ACCOUNT_TYPES.EXPENSE)
      .map((account) => ({
        ...account,
        balance: account.debitSum - account.creditSum,
      }));

    expenseAccountSum = expenseAccounts.reduce((acc, { balance }) => (acc + balance), 0);  
    revenueAccountSum = revenueAccounts.reduce((acc, { balance }) => (acc + balance), 0);
    netIncome = expenseAccountSum - revenueAccountSum; 

    const payload = {
      expenseAccountSum,
      expenseAccounts,
      netIncome,
      revenueAccountSum,
      revenueAccounts
    };

    res.json(payload);
  } catch (err) {
    console.log({ err });

    res.json({ err });
  }
};

module.exports = {
  generalJournalService,
  trialBalanceService,
  financeReportsService,
};

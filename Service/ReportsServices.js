const mongoose = require("mongoose");
const { CreateAccountModel } = require("../Models/Accounts");
const { ACCOUNT_TYPES, getBalanceOfAccount } = require('../Utils/Scripts');

const balanceSheetService = async (_req, res) => {
  // Accounts to add aggregate all accounts to one place
  let summedAccounts = [];
  
  let accountsName = [];
  // Promise Array to be used
  let allAccountsPromise = [];
  
  // Use connection list to get all collections
    try{
      const collectionsNames = await mongoose.connection.db.listCollections().toArray();
      collectionsNames.forEach(({name}) => {
        let collection = null;
        try{
          accountsName.push(name);
          collection = mongoose.model(name);
        }
        catch(err) {
          accountsName.push(name);
          collection = CreateAccountModel(name);
        }
        allAccountsPromise.push(collection.find({}));
      })

    }
    catch(err) {
      console.log({err});
      return res.status(500).send('Error occured while getting accounts from remote DB');
    }
  
    try {
      const promiseResults = await Promise.all(allAccountsPromise);
      promiseResults.forEach((account, index) => {
        const [ firstRecord ] = account;
        const { accountType } = firstRecord;
        const transformedCaseAccountType =  accountType.toUpperCase();
        
        // Check if account is of type asset or expense to get the sum by getting difference of credit from debit
        
        if(transformedCaseAccountType === ACCOUNT_TYPES.ASSETS || transformedCaseAccountType === ACCOUNT_TYPES.EXPENSE) {
          summedAccounts.push({
            name: accountsName[index],
            balance: getBalanceOfAccount(account, true, false),
          })
        }
        else {
          summedAccounts.push({
            name: accountsName[index],
            balance: getBalanceOfAccount(account, false, true),
          })
        }
      })
      res.json({ summedAccounts });
    } catch (err) {
      res.json({ err });
    }
};

const generalGournalService = async (req, res) => {
  let accounts = [];
  let allAccountsPromise = [];
  // Use connection list to get all collections
    try{
      const collectionsNames = await mongoose.connection.db.listCollections().toArray();
      collectionsNames.forEach(({name}) => {
        let collection = null;
        try{
          collection = mongoose.model(name);
        }
        catch(err) {
          collection = CreateAccountModel(name);
        }
        allAccountsPromise.push(collection.find({}));
      })

    }
    catch(err) {
      console.log({err});
      return res.status(500).send('Error occured while getting accounts from remote DB');
    }
    try {
      const promiseResults = await Promise.all(allAccountsPromise);
      accounts = promiseResults.flat();
      // Get all grouped transactions
      const groupedAccForGJ = accounts.reduce((groupedAcc, currentAcc) => {
        groupedAcc[currentAcc?.transactionId || "234903294023-049"] = [
          ...(groupedAcc[currentAcc?.transactionId || "234903294023-049"] ||
            []),
          currentAcc,
        ];
        return groupedAcc;
      }, {});

      res.json({ groupedAccForGJ });
      
    } catch (err) {

      res.json({ err });
      
    }
};

const financeReportsService = async (req, res) => {
  let accounts = [];
  let expenseAccounts = [];
  let assetsAccounts = [];
  // Use connection list to get all collections
    try{
      const collectionsNames = await mongoose.connection.db.listCollections().toArray();
      collectionsNames.forEach(({name}) => {
        console.log(typeof(name));
        if(!name.toUpperCase().includes( ACCOUNT_TYPES.ASSETS || ACCOUNT_TYPES.EXPENSE )) return;
        let collection = null;
        try{
          collection = mongoose.model(name);
        }
        catch(err) {
          collection = CreateAccountModel(name);
        }
        if(!name.toUpperCase().includes( ACCOUNT_TYPES.ASSETS)) assetsAccounts.push(collection.find({}));
        if(!name.toUpperCase().includes( ACCOUNT_TYPES.EXPENSE)) expenseAccounts.push(collection.find({}));
      })

    }
    catch(err) {
      console.log({err});
      return res.status(500).send('Error occured while getting accounts from remote DB');
    }
    try {
      const assetsAccountsResults = await Promise.all(assetsAccounts);
      const expenseAccountsResults = await Promise.all(expenseAccounts);

      console.log({assetsAccountsResults, expenseAccountsResults});

      const callBackForAssetSum = (assetAccountsSum, currentAssetAccount) => assetAccountsSum + getBalanceOfAccount(currentAssetAccount, true, false);
      const callBackForExpenseSum = (expenseAccoutSum, currentExpenseAccount) => expenseAccoutSum + getBalanceOfAccount(currentExpenseAccount, true, false);

      const assetsAccountSum = assetsAccountsResults.reduce(callBackForAssetSum, 0);
      const expenseAccountSum = expenseAccountsResults.reduce(callBackForExpenseSum, 0);

      console.log({
        assetsAccountSum,
        expenseAccountSum
      });


      res.json({  });
      
    } catch (err) {

      console.log({err});

      res.json({ err });
      
    }
};

module.exports = {
  balanceSheetService,
  generalGournalService,
  financeReportsService,
};

const mongoose = require("mongoose");
const { CreateAccountModel } = require("../Models/Accounts");
const GeneralJournalModel = require("../Models/GeneralJournalModel");

const createAccount = async (req, res) => {
  const {
    debitAmount,
    creditAmount,
    accountType,  
    accountTitle,
    transactionId,
  } = req.body;
  let accountModal;
  // checking if account already exists
  const collectionName = `${accountTitle}-${accountType}`;
  try {
    accountModal = mongoose.model(collectionName);
  } catch (err) {
    accountModal = CreateAccountModel(collectionName);
  }
  try{
    await accountModal.create({
      debitAmount: debitAmount || 0,
      creditAmount: creditAmount || 0,
      accountType,
      transactionId,
      accountTitle: collectionName,
    });
    await GeneralJournalModel.create({
      debitAmount: debitAmount || 0,
      creditAmount: creditAmount || 0,
      accountType,
      transactionId,
      accountName: collectionName,
    });
    return res.status(201).json({
      message: "Account created successfully",
    });
  }
    catch (err) {
      console.log(err);
      return res.status(500).json({ err: "something went wrong!" });
    }
};

module.exports = {
  createAccount,
};

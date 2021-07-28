const express = require("express");
const { CreateAccountModel } = require("../Models/Accounts");

const AccountsRoute = express.Router();
const { balanceSheetService } = require('../Service');

AccountsRoute.route("/gg-balance-sheet")
  .get(async (req, res) => {
    try{
      await balanceSheetService(req, res);
    }
    catch(err){
        cons
        res.json({err});
    }
  })
  .post((req, res) => {
    // just a dummy code to [POC]
    const {
      debitAmount,
      creditAmount,
      accountType,
      accountTitle,
      isCredit,
      isDebit,
    } = req.body;
    const collectionName = `${accountTitle}-${accountType}`;
    const accountModal = CreateAccountModel(collectionName);
    console.log(req.body);
    new accountModal({
      debitAmount,
      creditAmount,
      accountType,
      isCredit,
      isDebit,
    }).save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: "something went wrong!" });
      }
      return res.status(200).json({
        data,
      });
    });
  });

module.exports = AccountsRoute;

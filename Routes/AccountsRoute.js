const express = require("express");

const AccountsRoute = express.Router();
const { balanceSheetService, createAccount } = require("../Service");

AccountsRoute.route("/gg-balance-sheet")
  .get(async (req, res) => {
    try {
      await balanceSheetService(req, res);
    } catch (err) {
      res.json({ err });
    }
  })
  .post((req, res) => {
    createAccount(req, res);
  });

  

module.exports = AccountsRoute;

const express = require("express");

const AccountsRoute = express.Router();
const { generalJournalService, createAccount } = require("../Service");

AccountsRoute.route("/general-entries")
  .get(async (req, res) => {
    try {
      await generalJournalService(req, res);
    } catch (err) {
      res.json({ err });
    }
  })
  .post((req, res) => {
    createAccount(req, res);
  });

  

module.exports = AccountsRoute;

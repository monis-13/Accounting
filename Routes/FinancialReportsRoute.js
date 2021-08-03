const express = require("express");

const financialReportsRoute = express.Router();
const { financeReportsService } = require("../Service");

financialReportsRoute.route("/report")
  .get(async (req, res) => {
    try {
      await financeReportsService(req, res);
    } catch (err) {
      res.json({ err });
    }
  })
  .post((req, res) => {
    createAccount(req, res);
  });

  

module.exports = financialReportsRoute;

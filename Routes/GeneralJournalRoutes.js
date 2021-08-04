const express = require("express");

const GeneralJournalRoute = express.Router();
const { trialBalanceService } = require('../Service');

GeneralJournalRoute.route('/trial-balance')
.get(async (req, res) => {
    try{
        await trialBalanceService(req,res);
    }
    catch(Err) {
        res.json({Err});
    }
})

module.exports = GeneralJournalRoute;
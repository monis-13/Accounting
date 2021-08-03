const express = require("express");

const GeneralJournalRoute = express.Router();
const { generalGournalService } = require('../Service');

GeneralJournalRoute.route('/report')
.get(async (req, res) => {
    try{
        await generalGournalService(req,res);
    }
    catch(Err) {
        res.json({Err});
    }
})

module.exports = GeneralJournalRoute;
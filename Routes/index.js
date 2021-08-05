const express = require('express');
const mainRouter = express.Router();


mainRouter.use('/accounts',require('./AccountsRoute'));
mainRouter.use('/reports',require('./GeneralJournalRoutes'));
mainRouter.use('/financial-reports',require('./FinancialReportsRoute'));;

module.exports = mainRouter;

const balanceSheetServices = require('./ReportsServices');
const createAccountServices = require('./CreateTTableService');

module.exports = {
    ...balanceSheetServices,
    ...createAccountServices,
};
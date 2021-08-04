const generalJournalServices = require('./ReportsServices');
const createAccountServices = require('./CreateTTableService');

module.exports = {
    ...generalJournalServices,
    ...createAccountServices,
};
const serverInfo = require('./servers');
const tags = require('./Tags');
const schemas = require('./Components');
const POSTEntryDoc = require('./GeneralEntry');

module.exports = {
    openapi: "3.0.1",
    info: {
        title: "Computerized Accounting System",
        description: "APIs for Computerized Accounting System",
        contact: {
            name: "Muhammad Monis Mazhar",
            email: "monisms15@gmail.com",
            version: "1.0",
        }
    },
    ...serverInfo,
    ...tags,
    ...schemas,
    ...POSTEntryDoc,
    paths: ["getTodos"],
    apis: ["../Router/*.js"]
};
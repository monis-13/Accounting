const mongoose = require("mongoose");
const { CreateAccountModel } = require("../Models/Accounts");


const balanceSheetService = async (req, res) => {
    let accounts = [];
    let allAccountsPromise = [];
    mongoose.connection.db.listCollections().toArray(async (err, names) => {
      names.forEach(async ({ name }) => {
        const accountCollection = CreateAccountModel(name);
        allAccountsPromise.push(accountCollection.find({}));
      });
      try {
        const promiseResults = await Promise.all(allAccountsPromise);
        accounts = promiseResults.flat();
        res.json({accounts});
      } catch (err) {
          res.json({err});
      }
    });
};

module.exports = {
    balanceSheetService,
};
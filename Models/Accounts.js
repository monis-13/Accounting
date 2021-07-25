const mongoose = require("mongoose");


const CreateAccountModel = (accountName) => {
    const schema = mongoose.Schema({
        accountType: {
            type: String,
            required: [true, 'Account type must be given'],
        },
        creditAmount: {
           type: Number,
           required: [true, 'Credited amount must be given'],     
        },
        debitAmount: {
            type: Number,
            required: [true, 'Debited amount must be given'],     
        }
    })
    return mongoose.model(accountName, schema);
};

module.exports = {
    CreateAccountModel,
};

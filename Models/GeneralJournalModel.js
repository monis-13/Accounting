const mongoose  = require("mongoose");

const gjSchema = mongoose.Schema({
    transactionId: {
        type: String,
        required: [true, 'Transaciton Id is required!']
    },
    debitAmount: {
        type: Number,
        required: [true, 'Debit Amount is required!']
    },
    creditAmount: {
        type: Number,
        required: [true, 'Credit Amount is Required!']
    },
    accountType: {
        type: String,
        required: [true, 'Account Type is Required!']
    },
    accountName: {
        type: String,
        required: [true, 'Account Name is Required!']
    },
})

module.exports = mongoose.model('General-Journal', gjSchema);
module.exports = {
  ACCOUNT_TYPES: {
    ASSETS: "ASSETS",
    LIABILITIES: "LIABILITIES",
    OWNERWITHDRAWL: "OWNERWITHDRAWL",
    REVENUE: "REVENUE",
    EXPENSE: "EXPENSE",
  },
  getBalanceOfAccount: (transactions = [], isDebitAccount, isCreditAccount ) => {
    const dualEntry = {
        debitAmount: 0,
        creditAmount: 0,
    };  
    transactions.reduce(
      (accumlator, current) => {
        accumlator.debitAmount = accumlator.debitAmount + current.debitAmount;
        accumlator.creditAmount = accumlator.creditAmount + current.creditAmount;
        return accumlator;
      },
      dualEntry
    );
    console.log(dualEntry);
    let balance = 0; 
    if(isCreditAccount)  balance = dualEntry.creditAmount - dualEntry.debitAmount;
    if(isDebitAccount) balance =  dualEntry.debitAmount - dualEntry.creditAmount;
    return balance;
  },
};

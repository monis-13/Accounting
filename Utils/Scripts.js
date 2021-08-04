module.exports = {
  ACCOUNT_TYPES: {
    ASSETS: "Asset",
    LIABILITIES: "Liability",
    OWNERWITHDRAWL: "Ownerwithdrawl",
    REVENUE: "Revenue",
    EXPENSE: "Expense",
  },
  getBalanceOfAccount: (transactions = [], isDebitAccount, isCreditAccount ) => {
    const dualEntry = {
        debitAmount: 0,
        creditAmount: 0,
    };  
    transactions.reduce(
      (accumlator, current) => {
        accumlator.debitAmount = Number(accumlator.debitAmount) + Number(current.debitAmount);
        accumlator.creditAmount = Number(accumlator.creditAmount) + Number(current.creditAmount);
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
  getBalance: (account, isDebit = false, isCredit = false) => {
    const { creditAmount, debitAmount } = account; 
    if(isCredit) return creditAmount - debitAmount
    if(isDebit) return debitAmount - creditAmount;
    throw new Error('Must have one argument isDebit Or is Credit to true');s
  }
};

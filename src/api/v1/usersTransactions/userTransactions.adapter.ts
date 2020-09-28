import UsersTransactions from "../../../database/models/UsersTransactions";

class UserTransactionsAdapter {
  public static buildResponse(transactions: UsersTransactions[]) {
    return transactions.map(transaction => ({
      ...transaction, 
      typeTransaction: transaction.typeTransaction.name
    }))
  }
}

export default UserTransactionsAdapter;
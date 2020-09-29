import { EntityRepository, Repository } from "typeorm";
import UsersTransactions from "../../../database/models/UsersTransactions";

@EntityRepository(UsersTransactions)
export default class UsersTransactionsRepository extends Repository<UsersTransactions> {

  public async createTransaction(transaction: UsersTransactions): Promise<UsersTransactions> {
    return await this.save(transaction);
  }

  public async getIncomeOutome(typeTransaction: number, userId: number): Promise<UsersTransactions> {
    const transaction = this.createQueryBuilder('ut')
    .select("SUM(ut.value)")
    .where("ut.typeTransaction = :idTransaction", {idTransaction: typeTransaction})
    .andWhere("ut.user = :id", { id: userId })
    .getRawOne();

    return transaction;
  }

  public async getUserTransactions(idUser: number): Promise<UsersTransactions[]> {
    const transactions = await this.createQueryBuilder('ut')
      .select(['ut.name', 'ut.value', 'tt.name'])
      .innerJoin('ut.typeTransaction', 'tt')
      .where('ut.user = :id', {id:idUser})
      .getMany();
    
    return transactions;
  }
}
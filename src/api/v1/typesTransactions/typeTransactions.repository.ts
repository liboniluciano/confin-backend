import { EntityRepository, Repository } from "typeorm";
import TypesTransactions from "../../../database/models/TypesTransactions";

@EntityRepository(TypesTransactions)
export default class TypeTransactionsRepository extends Repository<TypesTransactions> {
  public async createTypeTransactions(typeTransactions: TypesTransactions): Promise<TypesTransactions> {
    return await this.save(typeTransactions);
  }

  public async getTypeTransactions(): Promise<TypesTransactions[]> {
    return await this.find();
  }

  public async getTypeTransaction(typeTransaction: number): Promise<TypesTransactions | undefined> {
    return this.findOne({ where: {id: typeTransaction }});
  }
}
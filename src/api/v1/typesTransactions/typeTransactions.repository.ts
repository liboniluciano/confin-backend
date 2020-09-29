import { EntityRepository, Repository } from "typeorm";
import TypesTransactions from "../../../database/models/TypesTransactions";

@EntityRepository(TypesTransactions)
export default class TypeTransactionsRepository extends Repository<TypesTransactions> {
  public async createTypeTransactions(typeTransactions: TypesTransactions): Promise<TypesTransactions> {
    return await this.save(typeTransactions);
  }
}
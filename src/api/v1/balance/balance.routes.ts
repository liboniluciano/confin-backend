import { Request, Response } from "express";
import { getRepository } from "typeorm";
import UsersTransactions from "../../../database/models/UsersTransactions";

export default class BalanceBusiness{
  async index(req: Request, res: Response) {
    try {
      const repo = getRepository(UsersTransactions);

      const { sum: income }  = await repo.createQueryBuilder('ut')
      .select("SUM(ut.value)")
      .where("ut.typeTransaction = 1")
      .andWhere("ut.user = :id", {id: req.user.id})
      .getRawOne();

      const { sum: outcome } = await repo.createQueryBuilder('ut')
      .select("SUM(ut.value)")
      .where("ut.typeTransaction = 2")
      .andWhere("ut.user = :id", {id: req.user.id})
      .getRawOne();

      console.log('income', income);
      console.log('outcome', outcome);

      const balance = income - outcome;

      return res.json({ 
        balance: {
          income: income,
          outcome: outcome,
          balance: balance
        }
    });

    } catch(err) {
      console.log(err);
      return res.status(500).json({ message: 'Falha ao buscar o saldo '});
      
    }
  }
}

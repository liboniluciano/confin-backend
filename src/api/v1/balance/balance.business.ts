import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsersTransactionsRepository from "../usersTransactions/usersTransactions.repository";

class BalanceBusiness{
  async index(req: Request, res: Response) {
    try {
      const repo = getCustomRepository(UsersTransactionsRepository);

      /** Recuperando valores 1 - income e  2 - outcome */
      const income: any = await repo.getIncomeOutome(1, req.user.id);
      const outcome: any  = await repo.getIncomeOutome(2, req.user.id);
    
      const balance = income.sum - outcome.sum;

      return res.json({ 
        balance: {
          income: income.sum ? income.sum: 0,
          outcome: outcome.sum? outcome.sum: 0,
          balance: balance
        }
    });

    } catch(err) {
      console.log(err);
      return res.status(500).json({ message: 'Falha ao buscar o saldo '});
      
    }
  }
}

export default BalanceBusiness;
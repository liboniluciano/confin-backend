import { validate } from "class-validator";
import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import TypesTransactions from "../../../database/models/TypesTransactions";
import UsersTransactions from "../../../database/models/UsersTransactions";
import UsersTransactionsRepository from "./usersTransactions.repository";
import UserTransactionsAdapter from "./userTransactions.adapter";

export interface TransactionPayload {
  name: string;
  value: number;
  user: any;
  typeTransaction: any;
}

interface ValueTransaction {
  sum: string;
}

export default class UsersTransactionsBusiness {
  async index(req: Request, res: Response) {
    try {

      const repo = getCustomRepository(UsersTransactionsRepository);
      const transactions = await repo.getUserTransactions(req.user.id);
      
      /** Método para formatar o retorno para o front-end */
      const response = UserTransactionsAdapter.buildResponse(transactions);

      return res.json(response);

    } catch(err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Não foi possível buscar transações '});
    }
  }

  async create(req: Request, res: Response) {
    try {
      const repo = getCustomRepository(UsersTransactionsRepository);
      const repoTypeTransaction = getRepository(TypesTransactions);

      const { name, value, typeTransaction, }  = req.body;

      const foundTypeTransaction = await repoTypeTransaction.findOne({
        where: { id: typeTransaction }
      });

      if(!foundTypeTransaction) {
        return res.status(404).json({ error: 'Este tipo de transação não existe'})
      }

      const userTransaction = repo.create(req.body);
      const errors = await validate(userTransaction);

      if(errors.length === 0) {
         /** Recuperando valores 1 - income e  2 - outcome */
        const income: any = await repo.getIncomeOutome(1, req.user.id);
        const outcome: any  = await repo.getIncomeOutome(2, req.user.id);

        /** Calculando o balance */
        const balance = income.sum - outcome.sum; 

        /** Verificando o tipo da transação */
        if(typeTransaction == 2) {
          /** Verificar se posso fazer o cadastro de uma dispesa */
          if(value > balance) {
            return res.status(401).json({ erro: `Esta despesa é maior que o seu saldo! Saldo disponível: R$ ${balance},00` })
          }
        }
        const response = await repo.save<TransactionPayload>({
          name,
          value,
          user: req.user.id,
          typeTransaction
        });

        return res.status(201).json(response);
      }

    } catch(err) {
      console.log(err);
      return res.status(500).json({ message: 'Não foi possível criar transação '});
    }
  }
}
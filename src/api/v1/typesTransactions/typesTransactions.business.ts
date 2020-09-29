import { validate } from "class-validator";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TypesTransactions from "../../../database/models/TypesTransactions";
import TypeTransactionsRepository from "./typeTransactions.repository";

export default class TypesTransactionsBusiness {
  async create(req: Request, res: Response) {
    try {
      const repo = getCustomRepository(TypeTransactionsRepository);
      const typeTransaction = repo.create(req.body);

      const errors = await validate(typeTransaction);

      if(errors.length === 0) {
        const response = await repo.save(typeTransaction);
        return res.status(201).json(response);
      }
      return res.status(400).json(errors.map(err => err.constraints));

    } catch(err) {
      return res.status(500).json({ message: 'Não foi possível criar tipo de transação '});

    }
  }
}
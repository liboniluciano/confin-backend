import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from './users.repository';

export default class UsersBusiness {
  async create(req: Request, res: Response) {
    try {
      const repo = getCustomRepository(UserRepository);
      const user = repo.create(req.body);
      const errors = await validate(user);

      const foundMail = await repo.findMail(req.body.mail);

      if(foundMail) {
        return res.status(400).json({ message: 'Existe um usuário cadastrado com este e-mail' });
      }

      if(errors.length === 0) {
        const response: any = await repo.createUser(user)
        const { id, name, mail }  = response;

        return res.status(201).json({ id, name, mail });
      }

      return res.status(400).json(errors.map(err => err.constraints));

    } catch(err) {
      console.log(err);
      return res.status(500).json({ message: 'Não foi possível criar usuário '});
    }
  }
}
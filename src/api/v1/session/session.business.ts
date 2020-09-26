import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";

import Users from "../../../database/models/Users";
import authConfig from '../../config/auth';

export default class SessionBusiness {
  async create(req: Request, res: Response) {
    const repo = getRepository(Users);
    let user: Users | undefined;

    try {
      const { mail, password } = req.body;
      
      user = await repo.findOne({ where: {mail }});
      if(!user) {
        return res.status(401).json({ message: 'Não foi encontrado nenhum usuário com este e-mail' });
      }

      if(!user.checkPassword(password)) {
        return res.status(401).json({ message: 'A senha não corresponde a correta' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name, 
          mail
        },
        token: jwt.sign({ id, name, mail }, authConfig.secret || "", {
          expiresIn: authConfig.expiresIn
        }),
      });

    } catch(err) {
      return res.status(500).json({ message:  'Falha ao gerar token para autenticação'});
    }
  }
}
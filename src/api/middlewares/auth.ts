import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { promisify } from "util";

import authConfig from '../config/auth';

export interface TokenPayload {
  id: number;
  name: string;
  mail: string;
}

export default async(req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({ message: 'O token não foi informado '});
  }

  try {
    const [, token] = authHeader.split(' ');
    const decoded = await promisify(jwt.verify)(token, authConfig.secret || '');

    const { id, name, mail } = decoded as TokenPayload;

    req.user = {
      id,
      name,
      mail
    };

    return next();

  } catch(err) {
    return res.status(401).json({ message: 'Token de acesso inválido!'});
  }
};
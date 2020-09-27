import { Router } from 'express';
import BalanceBusiness from './balance.routes';

import authMiddleware from '../../middlewares/auth';

const routeBalance = Router();

const businessBalance = new BalanceBusiness();

routeBalance.use(authMiddleware);
routeBalance.get('/', businessBalance.index);

export default routeBalance;
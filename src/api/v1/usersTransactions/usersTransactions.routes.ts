import { Router } from 'express';
import UsersTransactionsBusiness from './usersTransactions.business';

import authMiddleware from '../../middlewares/auth';

const routeUsersTransactions = Router();
const businessUsersTransactions = new UsersTransactionsBusiness();

routeUsersTransactions.use(authMiddleware);
routeUsersTransactions.post('/', businessUsersTransactions.create);
routeUsersTransactions.get('/', businessUsersTransactions.index);

export default routeUsersTransactions;
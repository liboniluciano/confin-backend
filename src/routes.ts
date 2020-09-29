import { Router } from 'express';
import routeSession from './api/v1/session/session.routes';
import routeUsers from './api/v1/users/users.routes';

import routeTypesTransactions from './api/v1/typesTransactions/typesTransactions.routes';
import routeUsersTransactions from './api/v1/usersTransactions/usersTransactions.routes';
import routeBalance from './api/v1/balance/balance.routes';

const routes = Router();

routes.use('/users', routeUsers);
routes.use('/session', routeSession);
routes.use('/typesTransactions', routeTypesTransactions);
routes.use('/usersTransactions', routeUsersTransactions);
routes.use('/balance', routeBalance);

routes.post('/ping', (req, res) => {
  return res.json({ message: 'Pong'});
});

export default routes;
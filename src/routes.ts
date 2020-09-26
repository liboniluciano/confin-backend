import { Router } from 'express';
import routeSession from './api/v1/session/session.routes';
import routeUsers from './api/v1/users/users.routes';

import authMiddleware from './api/middlewares/auth';
import routeTypesTransactions from './api/v1/typesTransactions/typesTransactions.routes';

const routes = Router();

routes.use('/users', routeUsers);
routes.use('/session', routeSession);
routes.use('/typesTransactions', routeTypesTransactions);

routes.post('/ping', authMiddleware, (req, res) => {
  console.log(req.user.mail);
  return res.json({ message: 'Pong'});
});

export default routes;
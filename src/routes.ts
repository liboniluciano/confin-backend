import { Router } from 'express';
import routeSession from './api/v1/session/session.routes';
import routeUsers from './api/v1/users/users.routes';

const routes = Router();

routes.use('/users', routeUsers);
routes.use('/session', routeSession);

routes.post('/ping',(req, res) => {
  return res.json({ message: 'Pong'});
});

export default routes;
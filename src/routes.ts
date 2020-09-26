import { Router } from 'express';
import routeUsers from './api/v1/users/users.routes';

const routes = Router();

routes.use('/users', routeUsers);

routes.post('/ping',(req, res) => {
  return res.json({ message: 'Pong'});
});

export default routes;
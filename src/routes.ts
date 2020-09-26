import { Router } from 'express';

const routes = Router();

routes.post('/ping',(req, res) => {
  return res.json({ message: 'Pong'});
});

export default routes;
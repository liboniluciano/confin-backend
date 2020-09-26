import { Router } from 'express';
import SessionBusiness from './session.business';

const routeSession = Router();

const businessSession = new SessionBusiness();

routeSession.post('/', businessSession.create);

export default routeSession;
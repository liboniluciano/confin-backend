import { Router } from 'express';
import UsersBusiness from './users.business';

const routeUsers = Router();
const businessUser = new UsersBusiness();

routeUsers.post('/', businessUser.create);

export default routeUsers;

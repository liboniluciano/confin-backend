import { Router } from 'express';
import TypesTransactionsBusiness from './typesTransactions.business';

const routeTypesTransactions = Router();

const businessTypesTransactions = new TypesTransactionsBusiness();

routeTypesTransactions.post('/', businessTypesTransactions.create);

export default routeTypesTransactions;
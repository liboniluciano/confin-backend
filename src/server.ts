import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';

import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { rootRouter } from './routes/rootRoutes';

const app = express();

app.use(express.json());

app.use('/', rootRouter);

export { app };

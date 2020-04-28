import express from 'express';

import { donatorsRouter } from './donatorsRoutes';
import { usersRouter } from "./usersRoutes";

const baseUrl = '/api';

const rootRouter = express.Router();

rootRouter.use(`${baseUrl}/donators`, donatorsRouter);
rootRouter.use(`${baseUrl}/users`, usersRouter);

export { rootRouter };

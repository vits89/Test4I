import express from 'express';

import { setCachedValue } from '../middleware/setCachedValue';
import { usersController } from '../controllers/usersController';

const usersRouter = express.Router();

usersRouter.post('/:id/donate', usersController.donate);
usersRouter.get('/:id/donators', setCachedValue(), usersController.getDonators);

export { usersRouter };

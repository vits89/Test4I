import express from 'express';

import { CACHE_KEYS } from '../constants/cacheKeys';

import { setCachedValue } from '../middleware/setCachedValue';
import { donatorsController } from '../controllers/donatorsController';

const donatorsRouter = express.Router();

donatorsRouter.get('/top', setCachedValue(CACHE_KEYS.TOP_DONATORS), donatorsController.getTop);

export { donatorsRouter };

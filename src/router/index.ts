import { Router } from 'express';

import { ROUTE } from '../constant/route';
import authRouter from './auth';

const router = Router();

router.use(ROUTE.AUTH.ROOT, authRouter);

export default router;

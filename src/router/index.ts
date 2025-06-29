import { Router } from 'express';

import { ROUTE } from '@/constant/route';

import authRouter from './auth';
import dicomRouter from './dicom';

const router = Router();

router.use(ROUTE.AUTH.ROOT, authRouter);
router.use(ROUTE.DICOM.ROOT, dicomRouter);

export default router;

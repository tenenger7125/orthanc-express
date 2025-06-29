import { Router } from 'express';

import { ROUTE } from '@/constant/route';
import { DicomController } from '@/controller/dicom-controller';

const router = Router();

router.get(ROUTE.DICOM.STUDIES, async (req, res) => {
  const dicomController = new DicomController();
  const studies = await dicomController.getStudies();
  res.send(studies);
});

export default router;

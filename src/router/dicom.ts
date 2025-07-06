import { Router } from 'express';

import { ROUTE } from '@/constant/route';
import { DicomController } from '@/controller/dicom-controller';

const router = Router();

router.get(ROUTE.DICOM.ECHO, async (req, res) => {
  const dicomController = new DicomController();
  const data = await dicomController.echo();
  res.send(data);
});

router.get(ROUTE.DICOM.FIND, async (req, res) => {
  const dicomController = new DicomController();
  const data = await dicomController.find();
  res.send(data);
});

router.get(ROUTE.DICOM.MOVE, async (req, res) => {
  const dicomController = new DicomController();
  const data = await dicomController.move(req.body);
  res.send(data);
});

router.get(ROUTE.DICOM.GET, async (req, res) => {
  const dicomController = new DicomController();
  const data = await dicomController.get(req.body);
  res.send(data);
});

export default router;

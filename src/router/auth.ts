import { Router } from 'express';

import { ROUTE } from '../constant/route';
import { AuthController } from '../controller/auth-controller';

const router = Router();

router.get(ROUTE.AUTH.LOGIN, (req, res) => {
  const authController = new AuthController();
  const token = authController.login();

  res.send(token);
});

export default router;

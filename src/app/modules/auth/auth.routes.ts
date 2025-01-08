import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validations';
import { authControllers } from './auth.controllers';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshTokenToAccessToken
);

export const authRoutes = router;

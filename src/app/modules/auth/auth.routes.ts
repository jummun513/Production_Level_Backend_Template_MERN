import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validations';
import { authControllers } from './auth.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../users/user/user.constants';

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

router.post(
  '/change-password',
  auth(USER_ROLES.user, USER_ROLES.admin),
  validateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword
);

router.post(
  '/forget-password',
  validateRequest(authValidations.forgetPasswordValidationSchema),
  authControllers.forgetPassword
);

router.post(
  '/reset-password',
  validateRequest(authValidations.resetPasswordValidationSchema),
  authControllers.resetPassword
);

router.post(
  '/verify-code',
  validateRequest(authValidations.verifyCodeValidationSchema),
  authControllers.verifyCode
);

router.post(
  '/resend-verification-code',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.resendVerificationCode
);
export const authRoutes = router;

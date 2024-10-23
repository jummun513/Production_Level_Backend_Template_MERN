import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.userCreateValidationSchema),
  userControllers.createUser
);

export const userRoutes = router;

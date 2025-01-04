import express from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../../middlewares/validateRequest';
import { userValidations } from './user.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.userCreateValidationSchema),
  userControllers.createUser
);

router.get('/:userId', userControllers.getSingleUser);

router.patch('/delete/:userId', userControllers.softDeleteSingleUser);

router.patch(
  '/:userId',
  validateRequest(userValidations.userUpdateValidationSchema),
  userControllers.updateSingleUser
);

export const userRoutes = router;

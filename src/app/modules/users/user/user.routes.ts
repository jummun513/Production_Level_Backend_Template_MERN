import express from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../../middlewares/validateRequest';
import { userValidations } from './user.validations';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from './user.constants';

const router = express.Router();

// not auth-guard in firebase authentication
router.post(
  '/',
  validateRequest(userValidations.userCreateValidationSchema),
  userControllers.createUser
);

router.get(
  '/:userId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.user),
  userControllers.getSingleUser
);

router.patch(
  '/delete/:userId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  userControllers.softDeleteSingleUser
);

router.patch(
  '/:userId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin, USER_ROLES.user),
  validateRequest(userValidations.userUpdateValidationSchema),
  userControllers.updateSingleUser
);

export const userRoutes = router;

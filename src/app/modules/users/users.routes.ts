import express from 'express';
import { usersControllers } from './users.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLES } from './user/user.constants';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  usersControllers.getAllUsers
);

export const usersRoutes = router;

import express from 'express';
import { usersControllers } from './users.controllers';

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

export const usersRoutes = router;

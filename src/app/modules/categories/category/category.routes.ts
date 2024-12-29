import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { categoryValidations } from './category.validations';
import { categoryControllers } from './category.controllers';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidations.categoryCreateValidationSchema),
  categoryControllers.createCategory
);

export const categoryRoutes = router;

import express from 'express';
import { productControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(productValidations.productCreateValidationSchema),
  productControllers.createProduct
);

router.get('/:userId', productControllers.getSingleProduct);

export const productRoutes = router;

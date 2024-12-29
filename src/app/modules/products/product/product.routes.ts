import express from 'express';
import { productControllers } from './product.controllers';
import { productValidations } from './product.validations';
import validateRequest from '../../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(productValidations.productCreateValidationSchema),
  productControllers.createProduct
);

router.get('/:productId', productControllers.getSingleProduct);

router.patch(
  '/delete/:productId',
  validateRequest(productValidations.productUpdateValidationSchema),
  productControllers.softDeleteSingleProduct
);

router.patch(
  '/:productId',
  validateRequest(productValidations.productUpdateValidationSchema),
  productControllers.updateSingleProduct
);

export const productRoutes = router;

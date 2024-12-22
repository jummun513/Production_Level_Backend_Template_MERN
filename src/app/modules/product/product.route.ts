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

router.get('/', productControllers.getAllProducts);

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

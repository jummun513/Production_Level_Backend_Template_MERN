import express from 'express';
import { productsControllers } from './products.controllers';

const router = express.Router();

router.get('/', productsControllers.getAllProducts);

export const productsRoutes = router;

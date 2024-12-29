import { Router } from 'express';
import { productRoutes } from '../modules/products/product/product.routes';
import { productsRoutes } from '../modules/products/products.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/products',
    route: productsRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

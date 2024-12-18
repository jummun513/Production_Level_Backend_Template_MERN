import { Router } from 'express';
import { productRoutes } from '../modules/product/product.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/product',
    route: productRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

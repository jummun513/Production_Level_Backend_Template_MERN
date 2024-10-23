import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

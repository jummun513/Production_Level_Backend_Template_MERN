import { Router } from 'express';
import { userRoutes } from '../modules/users/user/user.routes';
import { usersRoutes } from '../modules/users/users.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

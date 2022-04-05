import express from 'express';
import { router as authRoute } from './auth.route';
import { router as userRoute } from './user.route';
import { router as docsRoute } from './docs.route';
import { config } from '../../config/config';

export const routes = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    routes.use(route.path, route.route);
  });
}

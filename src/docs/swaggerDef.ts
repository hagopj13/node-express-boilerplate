import pkg from '../../package.json';
import { config } from '../config/config';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'node-express-boilerplate API documentation',
    version: pkg.version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

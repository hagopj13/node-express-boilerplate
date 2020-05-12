const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation discription',
      license: {
        name: 'MIT',
        url: 'https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/LICENSE',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['*.js'],
};
const specs = swaggerJsdoc(options);
router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;

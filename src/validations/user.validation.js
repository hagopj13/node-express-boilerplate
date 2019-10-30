const Joi = require('@hapi/joi');
const validationUtils = require('../utils/validation.util');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .custom(validationUtils.validatePassword),
    name: Joi.string().required(),
    role: Joi.string()
      .required()
      .valid('user', 'admin'),
  }),
};

module.exports = {
  createUser,
};

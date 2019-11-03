const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .custom(password),
    name: Joi.string().required(),
    role: Joi.string()
      .required()
      .valid('user', 'admin'),
  }),
};

module.exports = {
  createUser,
};

const Joi = require('joi');
const { password } = require('./custom.validation');

const max = 30;
const min = 3;

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required().min(min).max(max),
    lastName: Joi.string().required().min(min).max(max),
    email: Joi.string().required().email().min(min).max(max),
    password: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().max(max),
    password: Joi.string().required().max(max),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required().max(max),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password).max(max),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required().max(max),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};

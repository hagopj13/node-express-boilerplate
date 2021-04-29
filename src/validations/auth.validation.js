const Joi = require('joi');
const { facebookToken } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    facebookId: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    facebookId: Joi.string().required(),
    facebookToken: Joi.string().required().custom(facebookToken),
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

module.exports = {
  register,
  login,
  logout,
  refreshTokens
};

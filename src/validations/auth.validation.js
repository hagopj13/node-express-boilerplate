const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    facebookId: Joi.string().required(),
    name: Joi.string().required(),
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
  login,
  logout,
  refreshTokens
};

const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

// POST: Register user
const register = {
  body: Joi.object().keys({
    first_name: Joi.string().allow(''),
    last_name: Joi.string().allow(''),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    mobile_no: Joi.number().required(),
  }),
};

// POST: Verify OTP
const verifyotp = {
  query: Joi.object().keys({
    otp: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
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
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

// PUT: Update user details by ObjectID
const updateuser = {
  param: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    first_name: Joi.string().allow(''),
    last_name: Joi.string().allow(''),
    mobile_no: Joi.number().allow(),
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    address: Joi.string().allow(''),
    userImage: Joi.string().allow(''),
  }),
};

//DELETE : Soft delete user
const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

// GET : get all user
const userList = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    role: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  register,
  verifyotp,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateuser,
  deleteUser,
  userList
};

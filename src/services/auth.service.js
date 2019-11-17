const moment = require('moment');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const config = require('../config/config');
const tokenService = require('./token.service');
const userService = require('./user.service');
const AppError = require('../utils/AppError');

const generateAuthTokens = async userId => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = tokenService.generateToken(userId, accessTokenExpires);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = tokenService.generateToken(userId, refreshTokenExpires);
  await tokenService.saveToken(refreshToken, userId, refreshTokenExpires, 'refresh');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const checkPassword = async (password, correctPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, correctPassword);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    await checkPassword(password, user.password);
    return user;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
};

const refreshAuthTokens = async refreshToken => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
    const userId = refreshTokenDoc.user;
    await userService.getUserById(userId);
    await refreshTokenDoc.remove();
    return await generateAuthTokens(userId);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const generateResetPasswordToken = async email => {
  const user = await userService.getUserByEmail(email);
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = tokenService.generateToken(user._id, expires);
  await tokenService.saveToken(resetPasswordToken, user._id, expires, 'resetPassword');
  return resetPasswordToken;
};

module.exports = {
  generateAuthTokens,
  loginUser,
  refreshAuthTokens,
  generateResetPasswordToken,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { User, Token } = require('../models');
const { tokenService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(req.body);
  const tokens = await tokenService.generateAuthTokens(user.id);
  const response = { user: user.transform(), tokens };
  res.status(httpStatus.CREATED).send(response);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const tokens = await tokenService.generateAuthTokens(user.id);
  const response = { user: user.transform(), tokens };
  res.send(response);
});

const refreshTokens = catchAsync(async (req, res) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(req.body.refreshToken, 'refresh');
    const user = await User.findById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    const tokens = await tokenService.generateAuthTokens(user.id);
    const response = { ...tokens };
    res.send(response);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const resetPasswordToken = await tokenService.generateResetPasswordToken(user.id);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(req.query.token, 'resetPassword');
    const user = await User.findById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    user.password = req.body.password;
    await user.save();
    await Token.deleteMany({ user: user.id, type: 'resetPassword' });
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
});

module.exports = {
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await authService.generateAuthTokens(user.id);
  const response = {
    user: user.transform(),
    tokens,
  };
  res.status(httpStatus.CREATED).send(response);
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body.email, req.body.password);
  const tokens = await authService.generateAuthTokens(user.id);
  const response = {
    user: user.transform(),
    tokens,
  };
  res.send(response);
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuthTokens(req.body.refreshToken);
  const response = { ...tokens };
  res.send(response);
});

module.exports = {
  register,
  login,
  refreshTokens,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await authService.generateAuthTokens('5db5d97e287ebe4e58de5f28');
  const response = {
    user: user.transform(),
    tokens,
  };
  res.status(httpStatus.CREATED).send(response);
});

module.exports = {
  register,
};

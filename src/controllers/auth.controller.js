const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const response = {
    user: user.transform(),
  };
  res.status(httpStatus.CREATED).send(response);
});

module.exports = {
  register,
};

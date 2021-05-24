const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const login = catchAsync(async (req, res) => {
  const { facebookId } = req.body;
  let user = await userService.getUserByFacebookId(facebookId);
  if (!user) {
    // we create the user here
    console.log("we are here");
    user = await userService.createUser(req.body);
  }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  login,
  logout,
  refreshTokens
};

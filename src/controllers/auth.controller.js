const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const pick = require('../utils/pick');

// POST: Register user
const register = (async (req, res) => {

  const userExist = await userService.getUserByMobileNo(req.body.mobile_no);
  // Find mobile number from database
  if (userExist) {
    const otp = await tokenService.generateVerifyOtp(userExist);
    return res.status(httpStatus.CREATED).json({ msg: 'otp create successfully ', otp });
  }
  const user = await userService.createUser(req.body);
  const otp = await tokenService.generateVerifyOtp(user);

  return res.status(httpStatus.CREATED).send({ msg: 'otp create successfully ', otp, user });


});

// POST: Verify OTP
const verifyotp = catchAsync(async (req, res) => {
  const user = await authService.verifmobile_no(req.query.otp);
  const token = await tokenService.generateAuthTokens(user);
  res.status(200).json({ success: true, msg: 'otp verification succesfully', data: user, token: token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
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

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

// PUT: Update user details by ObjectID
const updateuser = catchAsync(async (req, res) => {
  try {
    // Find user by ObjectID
    const userExist = await userService.ExistUser(req.params.userId);
    (!userExist) ? res.status(httpStatus.NOT_FOUND).send({ msg: "User are not found" }) : 0;

    let payload = req.body
    if (payload.mobile_no) {
      const MobileNoExist = await userService.getUserByMobileNo(payload.mobile_no);
      (MobileNoExist) ? res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ msg: "MobileNo already exist" }) : 0
      payload.isMobileNoVerified = false
      // generate OTP
      var otp = await tokenService.generateVerifyOtp(userExist);
    }

    (req.file) ? payload.userImage = req.file.filename : 0

    const update = await userService.updateuser(req.params.userId, payload);
    res.status([200]).send({ msg: 'user update successfully', data: update, otp: otp });

  }
  catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ success: false, msg: "something went's wrong", error: error });
  }
});

// DELETE: show all data from database(Soft delete)
const deleteUser = catchAsync(async (req, res) => {
  const ExistUser = await userService.getUserById(req.params.userId);
  if (!ExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This User are not found');
  } else {
    const result = await userService.deleteUserById(req.params.userId);
    res.status(200).json({ success: true, mdg: 'Deleted Successfully', data: result });
  }
});

/**
 * List of Patient
 */
const userList = catchAsync(async (req, res) => {
  const { search } = pick(req.query, ['search']);
  let filter = {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  filter.deletedAt = null;
  if (search) {
    filter.first_name = { $regex: search, $options: 'i' };
  }
  options.sortBy = 'createdAt:desc';
  const result = await userService.userList(filter, options);
  res.status(200).json({ success: true, mdg: 'Get All patient Successfully', data: result });
});

module.exports = {
  register,
  verifyotp,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  updateuser,
  deleteUser,
  userList
};

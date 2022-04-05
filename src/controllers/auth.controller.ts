import httpStatus from 'http-status';
import { auth } from '../middlewares/auth';
import * as authService from '../services/auth.service';
import * as emailService from '../services/email.service';
import * as tokenService from '../services/token.service';
import * as userService from '../services/user.service';
import { catchAsync } from '../utils/catchAsync';
import * as authValidation from '../validations/auth.validation';

export const register = catchAsync(async (req, res) => {
  const { body } = authValidation.register.parse(req);
  const user = await userService.createUser(body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login = catchAsync(async (req, res) => {
  const {
    body: { email, password },
  } = authValidation.login.parse(req);
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export const logout = catchAsync(async (req, res) => {
  const { body } = authValidation.logout.parse(req);
  await authService.logout(body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokens = catchAsync(async (req, res) => {
  const { body } = authValidation.refreshTokens.parse(req);
  const tokens = await authService.refreshAuth(body.refreshToken);
  res.send({ ...tokens });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { body } = authValidation.forgotPassword.parse(req);
  const resetPasswordToken = await tokenService.generateResetPasswordToken(body.email);
  await emailService.sendResetPasswordEmail(body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req, res) => {
  const { body, query } = authValidation.resetPassword.parse(req);
  await authService.resetPassword(query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = await auth(req);
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { query } = authValidation.verifyEmail.parse(req);
  await authService.verifyEmail(query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

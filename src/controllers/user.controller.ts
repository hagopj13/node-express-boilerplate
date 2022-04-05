import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';
import * as userService from '../services/user.service';
import * as userValidation from '../validations/user.validation';
import { auth } from '../middlewares/auth';

export const createUser = catchAsync(async (req, res) => {
  await auth(req, 'manageUsers');
  const { body } = userValidation.createUser.parse(req);
  const user = await userService.createUser(body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (req, res) => {
  await auth(req, 'getUsers');
  const { query } = userValidation.getUsers.parse(req);

  const filter = { name: query.name, role: query.role };
  const options = { sortBy: query.sortBy, limit: query.limit, page: query.page };

  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

export const getUser = catchAsync(async (req, res) => {
  await auth(req, 'getUsers');
  const { params } = userValidation.getUser.parse(req);
  const user = await userService.getUserById(params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

export const updateUser = catchAsync(async (req, res) => {
  await auth(req, 'manageUsers');
  const { params, body } = userValidation.updateUser.parse(req);
  const user = await userService.updateUserById(params.userId, body);
  res.send(user);
});

export const deleteUser = catchAsync(async (req, res) => {
  await auth(req, 'manageUsers');
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

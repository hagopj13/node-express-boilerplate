const httpStatus = require('http-status');
const { pick } = require('lodash');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { getQueryOptions } = require('../utils/query.utils');

const createUser = catchAsync(async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(req.body);
  res.status(httpStatus.CREATED).send(user.transform());
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = getQueryOptions(req.query);
  const users = await User.find(filter, null, options);
  const response = users.map((user) => user.transform());
  res.send(response);
});

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user.transform());
});

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (req.body.email && (await User.isEmailTaken(req.body.email, user.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, req.body);
  await user.save();
  res.send(user.transform());
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

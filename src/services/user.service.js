const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
};

const createUser = async userBody => {
  await checkDuplicateEmail(userBody.email);
  const user = await User.create(userBody);
  return user;
};

const getUsers = async query => {
  const filter = pick(query, ['name', 'role']);
  const options = getQueryOptions(query);
  const users = await User.find(filter, null, options);
  return users;
};

const getUserById = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const getUserByEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found with this email');
  }
  return user;
};

const updateUser = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (updateBody.email) {
    await checkDuplicateEmail(updateBody.email, userId);
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUser = async userId => {
  const user = await getUserById(userId);
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};

const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const resourceState = require('../config/resourceStates');
const blockchainService = require('./blockchain.service');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.accountAlreadyExist(userBody.facebookId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account already exist');
  }
  const { pair, mnemonic } = await blockchainService.createPair();
  const data = {
    address: pair.address.toString(),
    meta: pair.meta,
    type: pair.type.toString(),
    mnemonic: mnemonic,
  }
  const pk = [];
  pair.publicKey.forEach(element => {
    pk.push(element);
  });
  userBody.blockchainData = {
    data: data,
    publicKey: pk
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by InstagramId
 * @param {string} InstagramId
 * @returns {Promise<User>}
 */
 const getUserByInstagramId = async (instagramAccountId) => {
  return User.findOne({ instagramAccountId });
};

const getUserByFacebookId = async (facebookId) => {
  return User.findOne({ facebookId });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const addImportedResourceForUserById = async (userId, updatedImportedResourceBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // proper quadratic algo lol
  updatedImportedResourceBody.forEach(element => {
    let flag = true;
    for(let i = 0; i < user.resource.length; i++){
      // dont add if already present
      if(user.resource[i].resourceUrl === element.resourceUrl){
        flag = false;
        break;
      }
    }
    if(flag)
      user.resource.push(element);
  });
  await user.save();
  return user;
};
// just use the filter in UI to show these things
const updateResourceStateForUserById = async (userId, resourceUrl, newState) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  let i = 0;
  for(i=0; i < user.resource.length; i++){
    if(user.resource[i].resourceUrl === resourceUrl){
      user.resource[i].state = newState;
      break;
    }
  }
  
  await user.save();
  return user;
};
/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByFacebookId,
  getUserByInstagramId,
  updateUserById,
  deleteUserById,
  addImportedResourceForUserById,
  updateResourceStateForUserById
};

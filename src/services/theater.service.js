const httpStatus = require('http-status');
const { Theater } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a theaters
 * @param {Object} theaterBody
 * @returns {Promise<User>}
 */
const createTheater = async (theaterBody) => {
  const theater = await Theater.create(theaterBody);
  return theater;
};

/**
 * Query for theaters
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTheaters = async (filter, options) => {
  const theaters = await Theater.paginate(filter, options);
  return theaters;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTheaterById = async (id) => {
  return Theater.findById(id);
};

/**
 * Update theater by id
 * @param {ObjectId} theaterId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateTheaterById = async (theaterId, updateBody) => {
  const theater = await getTheaterById(theaterId);
  if (!theater) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }

  Object.assign(theater, updateBody);
  await theater.save();
  return theater;
};

/**
 * Delete theater by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteTheaterById = async (userId) => {
  const theater = await getTheaterById(userId);
  if (!theater) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }
  await theater.remove();
  return theater;
};

module.exports = {
  createTheater,
  queryTheaters,
  getTheaterById,
  updateTheaterById,
  deleteTheaterById
};

const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a events
 * @param {Object} theaterBody
 * @returns {Promise<User>}
 */
const createEvent = async (theaterBody) => {
  const event = await Event.create(theaterBody);
  return event;
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
const queryEvents = async (filter, options) => {
  const theaters = await Event.paginate(filter, options);
  return theaters;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEventById = async (id) => {
  return Event.findById(id);
};

/**
 * Update event by id
 * @param {ObjectId} theaterId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateEventById = async (theaterId, updateBody) => {
  const event = await getEventById(theaterId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  Object.assign(event, updateBody);
  await event.save();
  return event;
};

/**
 * Delete event by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteEventById = async (userId) => {
  const event = await getEventById(userId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await event.remove();
  return event;
};

module.exports = {
  getEventById,
  queryEvents,
  createEvent,
  updateEventById,
  deleteEventById
};

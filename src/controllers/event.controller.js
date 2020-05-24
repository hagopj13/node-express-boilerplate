const httpStatus = require('http-status');
const { pick } = require('lodash');
const { Event } = require('../models');
const { eventService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getEvents = catchAsync(async (req, res) => {

  const query = pick(req.query, ['title', 'body']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const events = await eventService.queryEvents(query, options);

  res.send({ events: events });

});

const createEvent = catchAsync(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(httpStatus.CREATED).send(event);
});


module.exports = {
  getEvents,
  createEvent
};

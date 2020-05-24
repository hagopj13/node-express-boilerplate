const express = require('express');
const auth = require('../../middlewares/auth');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router.route('/')
  .get(auth('admin'), eventController.getEvents)
  .post(auth('admin'), eventController.createEvent);

module.exports = router;

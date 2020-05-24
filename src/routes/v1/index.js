const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const theaterRoute = require('./theater.route');
const eventRoute = require('./event.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

router.use('/theaters', theaterRoute);
router.use('/events', eventRoute);

router.use('/docs', docsRoute);

module.exports = router;

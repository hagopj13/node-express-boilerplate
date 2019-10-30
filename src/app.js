const express = require('express');
const passport = require('passport');
const config = require('./config/config');
const mongoose = require('./config/mongoose');
const loggger = require('./config/logger');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes/v1');
const { unknownRouteHandler, errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use(unknownRouteHandler);

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

mongoose.connect().then(() => {
  loggger.info('Connected to MongoDB');
  app.emit('ready');
});

module.exports = app;

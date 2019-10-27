const express = require('express');
const mongoose = require('./config/mongoose');
const loggger = require('./config/logger');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use('/v1', routes);

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

mongoose.connect().then(() => {
  loggger.info('Connected to MongoDB');
  app.emit('ready');
});

module.exports = app;

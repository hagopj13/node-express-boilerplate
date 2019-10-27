const express = require('express');
const mongoose = require('./config/mongoose');
const loggger = require('./config/logger');
const routes = require('./routes/v1');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

mongoose.connect().then(() => {
  loggger.info('Connected to MongoDB');
  app.emit('ready');
});

module.exports = app;

const express = require('express');
const mongoose = require('./config/mongoose');
const loggger = require('./config/logger');

const app = express();

app.use('/', (req, res) => {
  res.send('Working');
});

mongoose.connect().then(() => {
  loggger.info('Connected to MongoDB');
  app.emit('ready');
});

module.exports = app;

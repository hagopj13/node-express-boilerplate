const express = require('express');
const mongoose = require('./config/mongoose');

mongoose.connect();

const app = express();
app.use('/', (req, res) => {
  res.send('Working');
});

module.exports = app;

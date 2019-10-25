const express = require('express');

const app = express();
app.use('/', (req, res) => {
  res.send('Working');
});

module.exports = app;

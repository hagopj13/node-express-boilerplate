const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

mongoose.connection.on('error', error => {
  logger.error(`MongoDB connection error ${error}`);
  process.exit(1);
});

const connect = async () => {
  return mongoose.connect(config.mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connect,
};

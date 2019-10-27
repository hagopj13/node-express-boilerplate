const mongoose = require('mongoose');
const config = require('./config');

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

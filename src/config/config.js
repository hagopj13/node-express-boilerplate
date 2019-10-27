const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
};

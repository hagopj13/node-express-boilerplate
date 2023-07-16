const basicAuth = require('express-basic-auth');
const config = require('../config/config');

const apiDocBasicAuth = basicAuth({
  users: { [config.apiDoc.userName]: config.apiDoc.password }, // Replace with your own credentials
  challenge: true,
  realm: 'Imb4T3st4pp',
});

module.exports = apiDocBasicAuth;

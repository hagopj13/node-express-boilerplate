const moment = require('moment');
const config = require('../../src/config/config');
const Token = require('../../src/models/token.model');
const tokenService = require('../../src/services/token.service');
const { userOne, admin } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne.id, accessTokenExpires);
const adminAccessToken = tokenService.generateToken(admin.id, accessTokenExpires);

const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
const userOneRefreshTokenDoc = {
  token: tokenService.generateToken(userOne.id, refreshTokenExpires),
  user: userOne._id,
  type: 'refresh',
  expires: refreshTokenExpires.toDate(),
};

const insertTokenDoc = async tokenDoc => {
  await Token.create(tokenDoc);
};

module.exports = {
  userOneAccessToken,
  adminAccessToken,
  userOneRefreshTokenDoc,
  insertTokenDoc,
};

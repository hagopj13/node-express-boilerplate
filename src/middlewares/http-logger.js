const onFinished = require('on-finished');
const onHeaders = require('on-headers');
const logger = require('../config/logger');

function startTime() {
  this._startAt = process.hrtime();
}

const calResponseTime = (req, res) => {
  if (!req._startAt || !res._startAt) {
    return;
  }
  const ms = (res._startAt[0] - req._startAt[0]) * 1e3 + (res._startAt[1] - req._startAt[1]) * 1e-6;
  return ms;
};

// log time&req info
const httplogger = (req, res, next) => {
  req._startAt = undefined;
  res._startAt = undefined;
  startTime.call(req);

  onHeaders(res, startTime);
  onFinished(res, (err, resp) => {
    const statusCode = resp._header ? resp.statusCode : undefined;

    if (err) {
      logger.error(`[error] url: ${req.url} :${err}`);
    }

    const msg =
      `[url]: ${req.url}` +
      '---' +
      `[restime]: ${calResponseTime(req, res)}ms --- ` +
      `[statusCode]: ${statusCode}` +
      ` [method]: ${req.method}` +
      `[body]: ${JSON.stringify(req.body)}` +
      ` &[query]: ${JSON.stringify(req.query)}` +
      ` &[headers]: ${JSON.stringify(req.headers)}`;
    logger.info(msg);
  });
  next();
};

module.exports = {
  httplogger,
};

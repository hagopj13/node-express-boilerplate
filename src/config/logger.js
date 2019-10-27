const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      stderrLevels: ['error'],
      format: winston.format.combine(
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
      ),
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;

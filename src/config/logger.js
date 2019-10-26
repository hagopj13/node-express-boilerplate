const winston = require('winston');
const { env } = require('./config');

const logger = winston.createLogger({
  level: env === 'development' ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      stderrLevels: ['error'],
      format: winston.format.combine(
        env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
      ),
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;

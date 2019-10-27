const app = require('./app');
const logger = require('./config/logger');
const config = require('./config/config');

app.on('ready', () => {
  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

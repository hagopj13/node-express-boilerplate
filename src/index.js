const app = require('./app');
const logger = require('./config/logger');
const { port } = require('./config/config');

app.listen(port, () => {
  logger.info(`Listening to port ${port}`);
});

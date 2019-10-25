const app = require('./app');
const { port } = require('./config/config');

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

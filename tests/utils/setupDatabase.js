const mongoose = require('mongoose');
const config = require('../../src/config/config');

const clearDatabase = async () => {
  await Promise.all(Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany()));
};

const setupDatabase = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupDatabase;

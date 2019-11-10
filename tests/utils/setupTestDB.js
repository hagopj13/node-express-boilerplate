const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const config = require('../../src/config/config');

let mongod;

const setupTestDB = () => {
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();
    await mongoose.connect(uri, config.mongoose.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
};

module.exports = setupTestDB;

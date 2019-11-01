const { User, Token } = require('../../src/models');

const clearDatabase = async () => {
  await User.deleteMany();
  await Token.deleteMany();
};

module.exports = clearDatabase;

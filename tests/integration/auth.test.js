const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupDatabase = require('../utils/setupDatabase');
const { User } = require('../../src/models');

setupDatabase();

describe('Auth route', () => {
  describe('POST /v1/auth/register', () => {
    test('should successfully register user and return 201, if request data is ok', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };

      const res = await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      const resUser = res.body.user;
      expect(resUser).not.toHaveProperty('password');
      expect(resUser).toEqual({ id: expect.anything(), name: newUser.name, email: newUser.email, role: 'user' });

      const dbUser = await User.findById(resUser.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, role: 'user' });
    });

    test('should return access and refresh tokens, if request data is ok', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };

      const res = await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });
  });
});

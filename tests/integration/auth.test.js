const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupDatabase = require('../utils/setupDatabase');
const { User } = require('../../src/models');
const { userOne, insertUsers } = require('../fixtures/user.fixture');

setupDatabase();

describe('Auth route', () => {
  describe('POST /v1/auth/register', () => {
    test('should successfully register user and return 201 if request data is ok', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };

      const res = await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toEqual({ id: expect.anything(), name: newUser.name, email: newUser.email, role: 'user' });

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, role: 'user' });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test('should return a 401 error if email is missing', async () => {
      const newUser = {
        name: faker.name.findName(),
        password: 'password1',
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return a 401 error if email is invalid', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: 'invalidEmail',
        password: 'password1',
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return a 401 error if email is already used', async () => {
      await insertUsers([userOne]);
      const newUser = {
        name: faker.name.findName(),
        email: userOne.email,
        password: 'password1',
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return a 401 error if password is missing', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return a 401 error if password length is less than 8 characters', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'passwo1',
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return a 401 error if password does not contain both letters and numbers', async () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password',
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return a 401 error if name is missing', async () => {
      const newUser = {
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };

      await request(app)
        .post('/v1/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});

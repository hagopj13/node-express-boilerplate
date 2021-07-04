const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');

describe('Auth routes', () => {
  describe('GET /v1/docs', () => {
    test('should return 404 when running in production', async () => {
      config.env = 'production';
      await request(app).get('/v1/docs').send().expect(httpStatus.NOT_FOUND);
      config.env = process.env.NODE_ENV;
    });
  });
});

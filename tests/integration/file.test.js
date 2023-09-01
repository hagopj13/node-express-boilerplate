const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const route = '/v1/file/upload';
const imageFileToUpload = __dirname + '/dummy.png';
const pdfFileToUpload = __dirname + '/dummy.pdf';

describe('File upload routes', () => {

  describe(`POST ${route}`, () => {

    test('should return 200 and successfully uploaded file', async () => {

      const res = await request(app)
        .post(route)
        .set('Content-Type', 'multipart/form-data')
        .attach('fileName', imageFileToUpload)
        .expect(httpStatus.OK);

      expect(res.text).toEqual('File is saved!');

    });

    test('should return 500 for no file uploaded', async () => {

      await request(app)
        .post(route)
        .set('Content-Type', 'multipart/form-data')
        .attach('fileName', null)
        .expect(httpStatus.INTERNAL_SERVER_ERROR);

    });
    
    test('should return 400 for not an image file', async () => {

      const res = await request(app)
        .post(route)
        .set('Content-Type', 'multipart/form-data')
        .attach('fileName', pdfFileToUpload)
        .expect(httpStatus.BAD_REQUEST);

    });     

  });

});  
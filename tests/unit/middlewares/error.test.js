const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const { errorConverter } = require('../../../src/middlewares/error');
const AppError = require('../../../src/utils/AppError');

describe('Error middlewares', () => {
  describe('Error converter', () => {
    test('should return the same AppError object it was called with', () => {
      const error = new AppError(httpStatus.BAD_REQUEST, 'Any error');
      const next = jest.fn();
      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('should convert an Error to AppError and preserve its status and message', () => {
      const error = new Error('Any error');
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();
      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert an Error without status to AppError with status 500', () => {
      const error = new Error('Any error');
      const next = jest.fn();
      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert an Error without message to AppError with default message of that http status', () => {
      const error = new Error();
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();
      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: httpStatus[error.statusCode],
          isOperational: false,
        })
      );
    });

    test('should convert any other object to AppError with status 500 and its message', () => {
      const error = {};
      const next = jest.fn();
      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          isOperational: false,
        })
      );
    });
  });
});

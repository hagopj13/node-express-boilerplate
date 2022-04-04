import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { ApiError } from './ApiError';
export function catchAsync<T extends Request>(fn: (req: T, res: Response, next: NextFunction) => void) {
  return (req: Parameters<typeof fn>[0], res: Parameters<typeof fn>[1], next: Parameters<typeof fn>[2]) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (err instanceof ZodError) {
        const errorMessage = err.issues.map((details) => details.message).join(', ');
        next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      } else {
        next(err);
      }
    });
  };
}

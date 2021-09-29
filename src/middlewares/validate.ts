import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { z } from 'zod';
import { ApiError } from '../utils/ApiError';
import { pick } from '../utils/pick';

export const validate =
  <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    let newObject = pick(req, ['query', 'params', 'body']);

    try {
      const value = schema.parse(newObject);
      Object.assign(req, value);
    } catch (error: unknown) {
      if (!(error instanceof z.ZodError)) return;
      const errorMessage = error.issues.map((details) => details.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    return next();
  };

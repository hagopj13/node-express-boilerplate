import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
export function catchAsync<
  T extends z.ZodObject<{
    body: z.ZodObject<z.ZodRawShape>;
    params: z.ZodObject<z.ZodRawShape>;
    query: z.ZodObject<z.ZodRawShape>;
  }>
>(
  fn: (
    req: Request<z.infer<T>['params'], z.infer<T>['body'], z.infer<T>['body'], z.infer<T>['query']>,
    res: Response,
    next: NextFunction
  ) => void
) {
  return (req: Parameters<typeof fn>[0], res: Parameters<typeof fn>[1], next: Parameters<typeof fn>[2]) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}

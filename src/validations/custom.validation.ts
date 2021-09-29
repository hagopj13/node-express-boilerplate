import { z } from 'zod';

export const objectId = (value: string, ctx: z.RefinementCtx) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '"{{#label}}" must be a valid mongo id',
    });
    return;
  }
  return value;
};

export const password = (value: string, ctx: z.RefinementCtx) => {
  if (value.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'password must be at least 8 characters',
    });
    return;
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'password must contain at least 1 letter and 1 number',
    });
    return;
  }
  return value;
};

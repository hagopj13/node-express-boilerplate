import { z } from 'zod';
import { objectId, password } from './custom.validation';

export const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().superRefine(password),
    name: z.string(),
    role: z.union([z.literal('admin'), z.literal('user')]),
  }),
});

export const getUsers = z.object({
  query: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z
      .string()
      .transform((v) => parseInt(v, 10))
      .optional(),
    page: z
      .string()
      .transform((v) => parseInt(v, 10))
      .optional(),
  }),
});

export const getUser = z.object({
  params: z.object({
    userId: z.string().superRefine(objectId).optional(),
  }),
});

export const updateUser = z.object({
  params: z.object({
    userId: z.string().superRefine(objectId),
  }),
  body: z
    .object({
      email: z.string().email().optional(),
      password: z.string().superRefine(password).optional(),
      name: z.string().optional(),
    })
    .optional(),
});

export const deleteUser = z.object({
  params: z.object({
    userId: z.string().superRefine(objectId).optional(),
  }),
});

import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = z.object({
  NODE_ENV: z.union([z.literal('production'), z.literal('development'), z.literal('test')]),
  PORT: z
    .string()
    .default('3000')
    .transform((str) => parseInt(str, 10)),
  // Mongo DB url
  MONGODB_URL: z.string(),
  // JWT secret key
  JWT_SECRET: z.string(),
  // minutes after which access tokens expire
  JWT_ACCESS_EXPIRATION_MINUTES: z
    .string()
    .default('30')
    .transform((str) => parseInt(str, 10)),
  // days after which refresh tokens expire
  JWT_REFRESH_EXPIRATION_DAYS: z
    .string()
    .default('30')
    .transform((str) => parseInt(str, 10)),
  // minutes after which reset password token expires
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z
    .string()
    .default('10')
    .transform((str) => parseInt(str, 10)),
  // minutes after which verify email token expires
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z
    .string()
    .default('10')
    .transform((str) => parseInt(str, 10)),
  // server that will send the emails
  SMTP_HOST: z.string(),
  // port to connect to the email server
  SMTP_PORT: z.string().transform((str) => parseInt(str, 10)),
  // username for email server
  SMTP_USERNAME: z.string(),
  // password for email server
  SMTP_PASSWORD: z.string(),
  // the from field in the emails sent by the app
  EMAIL_FROM: z.string(),
});

const envVars = envVarsSchema.parse(process.env);

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};

import { Request } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { Permission, roleRights } from '../config/roles';
import { UserModel } from '../models/user.model';
import { ApiError } from '../utils/ApiError';

const passportAuthenticate = async (req: Request): Promise<UserModel> => {
  return await new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user: UserModel | undefined, info: unknown) => {
      if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
      resolve(user);
    })(req);
  });
};

export const auth = async (req: Request, ...requiredRights: Permission[]) => {
  const user = await passportAuthenticate(req);

  if (requiredRights.length) {
    const userRights = roleRights[user.role];
    const hasRequiredRights = requiredRights.every((requiredRight) =>
      (userRights as unknown as string[]).includes(requiredRight)
    );
    if (!hasRequiredRights && req.params.userId !== user.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  return user;
};

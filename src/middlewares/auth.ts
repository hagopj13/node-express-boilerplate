import { Request } from "express";
import httpStatus from 'http-status';
import passport from 'passport';
import { Permissions, roleRights } from '../config/roles';
import { UserModel } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
namespace Express {
  export interface Request {
    user?: UserModel
  }
}

const verifyCallback = (req: Request, resolve, reject, requiredRights: Permissions[]) => async (err, user?: UserModel, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

export const auth =
  (...requiredRights: Permissions[]) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

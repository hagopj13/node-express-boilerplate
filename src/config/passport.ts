import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from './config';
import { tokenTypes } from './tokens';
import { User } from '../models/user.model';
import { JwtPayload } from 'jsonwebtoken';
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: JwtPayload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error('Invalid token type');
      }
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

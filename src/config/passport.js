const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');
const { userService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
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
};

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};
const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await userService.getUserByEmail(profile._json.email);

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      name: profile.displayName,
      email: profile._json.email,
      googleId: profile.id,
    });

    await userService.createUser(newUser);
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOptions, googleVerify);

module.exports = {
  jwtStrategy,
  googleStrategy,
};

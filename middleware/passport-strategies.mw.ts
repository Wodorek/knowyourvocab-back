import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import Admin from '../models/admin';
import { IAdmin } from '../interfaces';

passport.serializeUser((user: any, done) => {
  if (user.password) {
    delete user.password;
  }
  return done(null, user);
});
passport.deserializeUser((user: Express.User, done) => {
  return done(null, user);
});

passport.use(
  new passportLocal.Strategy({}, async (username, password, done) => {
    try {
      const foundUser = await Admin.findOne({ username: username });

      if (!foundUser) {
        return done(null, false, { message: 'No user with this name found' });
      }

      let isMatchingPassword;
      if (foundUser) {
        isMatchingPassword = await bcrypt.compare(
          password,
          foundUser.password as string
        );
      }

      if (!isMatchingPassword) {
        return done(null, false, {
          message: 'incorrect user/ password combination',
        });
      }

      if (foundUser && isMatchingPassword) {
        return done(null, foundUser);
      }

      return done(null, false);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_STRING as string,
    },
    (payload: IAdmin, done: Function) => {
      try {
        done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

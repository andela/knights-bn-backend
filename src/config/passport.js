import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FcbkStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import getUser from '../middlewares/getUserFromResourceServer';

dotenv.config();


passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, getUser));

passport.use(new FcbkStrategy({
  clientID: process.env.FCBK_CLIENT_ID,
  clientSecret: process.env.FCBK_CLIENT_SECRET,
  profileFields: ['email', 'name', 'gender'],
  callbackURL: process.env.FCBK_CALLBACK_URL,
  enableProof: true,
}, getUser));

export default passport;

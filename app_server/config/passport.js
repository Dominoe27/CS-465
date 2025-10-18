// app_server/config/passport.js
// JWT strategy: reads Bearer token, verifies with JWT_SECRET, loads User.

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User'); // registered in db.js via require('./user')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // payload.sub contains the user id we signed in the token
      const user = await User.findById(payload.sub).lean();
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

// Not strictly required to export, but harmless and helps with tests
module.exports = passport;
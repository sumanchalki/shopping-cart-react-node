const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('../config/config.prod');
}
else if (process.env.NODE_ENV === 'dev') {
  config = require('../config/config.dev');
}

// Create a local strategy.
const localStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password'
};
const localLogin = new LocalStrategy(localStrategyOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, userFound) {
    if (err) { return done(err); }
    // TODO: Use a common function to throw form errors.
    if (!userFound) { return done(null, false, { success: false, errors: { 'form': 'Wrong email or password' } }); }

    userFound.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }

      // Call done with no error and user as false (not found).
      if (!isMatch) { return done(null, false, { success: false, errors: { 'form': 'Wrong email or password' } }); }

      // Call done with the user found.
      return done(null, userFound);
    });
  });
});

// Create a JWT strategy.
const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtStrategyOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      // Call done with the user found.
      done(null, user);
    } else {
      // Call done with no error and user as false (not found).
      done(null, false);
    }
  });
});

// Use the strategies created.
passport.use(jwtLogin);
passport.use(localLogin);

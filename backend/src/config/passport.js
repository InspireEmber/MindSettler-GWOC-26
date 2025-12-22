const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const User = require('../models/User');

// Configure passport-local-mongoose plugin strategy on Admin model (admin login)
passport.use(new LocalStrategy(Admin.authenticate()));

// Serialize both Admin and User instances into the session
passport.serializeUser((user, done) => {
  const type = user.role === 'admin' ? 'admin' : 'user';
  done(null, { id: user._id, type });
});

passport.deserializeUser(async (payload, done) => {
  try {
    if (payload.type === 'admin') {
      const admin = await Admin.findById(payload.id);
      return done(null, admin || null);
    }

    const user = await User.findById(payload.id);
    return done(null, user || null);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

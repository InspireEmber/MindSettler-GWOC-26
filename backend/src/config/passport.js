const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const User = require('../models/User');

// Configure passport-local-mongoose plugin strategy on Admin model (admin login)
passport.use(new LocalStrategy(Admin.authenticate()));

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_CLIENT_SECRET",
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback",
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
},
  async (accessToken, refreshToken, profile, done) => {
    console.log("Google Auth Strategy Initialized. Checking User...");
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.findOne({ email });
        if (user) {
          user.googleId = profile.id;
        } else {
          user = new User({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
          });
        }
      }

      // Always update tokens on login
      user.googleAccessToken = accessToken;
      if (refreshToken) user.googleRefreshToken = refreshToken;

      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

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

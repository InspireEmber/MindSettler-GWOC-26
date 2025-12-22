const passport = require('passport');
const Admin = require('../models/Admin');

// Admin login (session-based, cookie auth)
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: (info && info.message) || 'Invalid credentials',
      });
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      return res.json({
        success: true,
        message: 'Logged in successfully',
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
  })(req, res, next);
};

// Admin logout
exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    });
  });
};

// Get current logged-in admin
exports.me = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  res.json({
    success: true,
    data: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

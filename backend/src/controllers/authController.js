const passport = require('passport');
const Admin = require('../models/Admin');
const User = require('../models/User');

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

// User signup (email/password)
exports.userSignup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    next(err);
  }
};

// User login (email/password) with session-based auth
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
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
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

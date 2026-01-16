const passport = require('passport');
const Admin = require('../models/Admin');
const User = require('../models/User');
const crypto = require('crypto');
const emailService = require('../services/emailService');

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
    console.log(`[Login] Attempt for email: ${email}`);

    // Explicitly select password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(`[Login] Failure: User not found with email: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    console.log(`[Login] User found. Comparing passwords...`);
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log(`[Login] Failure: Password mismatch for user: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    console.log(`[Login] Success: Password matches. Logging in session...`);
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error(`[Login] req.logIn Error:`, loginErr);
        return next(loginErr);
      }

      console.log(`[Login] Session established successfully for: ${email}`);
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
    console.error(`[Login] Unexpected Error:`, err);
    next(err);
  }
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account with that email address exists',
      });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');

    // Set token and expiry on user (1 hour)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password/${token}`;

    console.log(`[ForgotPassword] Generated Reset URL: ${resetUrl}`);

    // Send email
    await emailService.sendPasswordResetEmail(user.email, resetUrl);

    res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (err) {
    next(err);
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log(`[ResetPassword] Received token: ${token}`);
    console.log(`[ResetPassword] Checking against Time: ${new Date().toISOString()}`);

    // Debug: Find user by token only to see if it exists
    const userByToken = await User.findOne({ resetPasswordToken: token });
    if (!userByToken) {
      console.log(`[ResetPassword] Token NOT found in DB.`);
    } else {
      console.log(`[ResetPassword] Token FOUND for user: ${userByToken.email}`);
      console.log(`[ResetPassword] Expiry in DB: ${userByToken.resetPasswordExpires}`);
      console.log(`[ResetPassword] Is Expired? ${userByToken.resetPasswordExpires < Date.now()}`);
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log(`[ResetPassword] Final check failed: Token invalid or expired.`);
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired',
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    console.log(`[ResetPassword] Password successfully updated for: ${user.email}`);

    res.json({
      success: true,
      message: 'Password has been changed',
    });
  } catch (err) {
    console.error(`[ResetPassword] Error:`, err);
    next(err);
  }
};

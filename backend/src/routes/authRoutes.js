const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const wrapAsync = require('../utils/wrapAsync');
const { validateBody } = require('../middleware/validationMiddleware');
const { loginSchema, userSignupSchema, userLoginSchema } = require('../validation/authValidation');
const { isAuthenticated } = require('../middleware/authMiddleware');

const passport = require('passport');

// Admin login
router.post('/login', validateBody(loginSchema), authController.login);

// Admin logout
router.post('/logout', isAuthenticated, wrapAsync(authController.logout));

// Current admin profile
router.get('/me', isAuthenticated, wrapAsync(authController.me));

// User signup
router.post('/user/signup', validateBody(userSignupSchema), wrapAsync(authController.userSignup));

// User login
router.post('/user/login', validateBody(userLoginSchema), wrapAsync(authController.userLogin));

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=GoogleAuthFailed' }),
  (req, res) => {
    // Successful authentication, redirect to frontend dashboard/booking page
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/book-session`);
  }
);

module.exports = router;

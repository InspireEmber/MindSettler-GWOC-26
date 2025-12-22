const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const wrapAsync = require('../utils/wrapAsync');
const { validateBody } = require('../middleware/validationMiddleware');
const { loginSchema, userSignupSchema, userLoginSchema } = require('../validation/authValidation');
const { isAuthenticated } = require('../middleware/authMiddleware');

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

module.exports = router;

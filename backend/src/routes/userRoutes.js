const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const wrapAsync = require('../utils/wrapAsync');
const isUserAuthenticated = require('../middleware/isUserAuthenticated');

// All routes below require an authenticated user session
router.get('/profile', isUserAuthenticated, wrapAsync(userController.getProfile));
router.put('/profile', isUserAuthenticated, wrapAsync(userController.updateProfile));
router.get('/sessions-summary', isUserAuthenticated, wrapAsync(userController.getSessionsSummary));
router.get('/sessions', isUserAuthenticated, wrapAsync(userController.getSessions));

module.exports = router;
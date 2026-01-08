const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const wrapAsync = require('../utils/wrapAsync');
const { validateBody } = require('../middleware/validationMiddleware');
const { createBookingSchema } = require('../validation/bookingValidation');
const isUserAuthenticated = require('../middleware/isUserAuthenticated');

// Create booking request (authenticated users only)
router.post(
  '/',
  isUserAuthenticated,
  validateBody(createBookingSchema),
  wrapAsync(bookingController.createBooking),
);

// Get booking status (public)
router.get('/:id', wrapAsync(bookingController.getBookingStatus));

// Add to Google Calendar (Authenticated)
router.post('/:id/calendar', isUserAuthenticated, wrapAsync(bookingController.addToGoogleCalendar));

module.exports = router;

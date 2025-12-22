const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const wrapAsync = require('../utils/wrapAsync');
const { validateBody } = require('../middleware/validationMiddleware');
const { createBookingSchema } = require('../validation/bookingValidation');

// Create booking request (public)
router.post('/', validateBody(createBookingSchema), wrapAsync(bookingController.createBooking));

// Get booking status (public)
router.get('/:id', wrapAsync(bookingController.getBookingStatus));

module.exports = router;

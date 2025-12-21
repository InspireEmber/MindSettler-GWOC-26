const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create booking request
router.post('/', bookingController.createBooking);

// Get booking status
router.get('/:id', bookingController.getBookingStatus);

module.exports = router;

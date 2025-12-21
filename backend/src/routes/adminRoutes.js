const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all appointments
router.get('/appointments', adminController.getAllAppointments);

// Get appointment by ID
router.get('/appointments/:id', adminController.getAppointmentById);

// Approve appointment
router.post('/appointments/:id/approve', adminController.approveAppointment);

// Reject appointment
router.post('/appointments/:id/reject', adminController.rejectAppointment);

// Update appointment status
router.put('/appointments/:id/status', adminController.updateAppointmentStatus);

module.exports = router;

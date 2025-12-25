const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const slotController = require('../controllers/slotController');
const wrapAsync = require('../utils/wrapAsync');
const { isAuthenticated, requireRole } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const {
  approveAppointmentSchema,
  rejectAppointmentSchema,
  updateAppointmentStatusSchema,
  markPaymentSchema,
} = require('../validation/adminValidation');

// All routes here are admin-only
router.use(isAuthenticated, requireRole('admin'));

// Get all appointments
router.get('/appointments', wrapAsync(adminController.getAllAppointments));

// Get appointment by ID
router.get('/appointments/:id', wrapAsync(adminController.getAppointmentById));

// Approve appointment
router.post(
  '/appointments/:id/approve',
  validateBody(approveAppointmentSchema),
  wrapAsync(adminController.approveAppointment),
);

// Reject appointment
router.post(
  '/appointments/:id/reject',
  validateBody(rejectAppointmentSchema),
  wrapAsync(adminController.rejectAppointment),
);

// Update appointment status
router.put(
  '/appointments/:id/status',
  validateBody(updateAppointmentStatusSchema),
  wrapAsync(adminController.updateAppointmentStatus),
);

// Mark appointment payment (UPI/cash/manual)
router.post(
  '/appointments/:id/payment',
  validateBody(markPaymentSchema),
  wrapAsync(adminController.markAppointmentPayment),
);

// Basic stats overview
router.get('/stats/overview', wrapAsync(adminController.getStatsOverview));

// Delete a slot (Admin only)
router.delete(
  '/slots/:id',
  wrapAsync(slotController.deleteSlot)
);

router.use(isAuthenticated, requireRole('admin'));



module.exports = router;

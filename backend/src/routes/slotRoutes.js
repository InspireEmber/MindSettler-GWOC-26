const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const wrapAsync = require('../utils/wrapAsync');
const { isAuthenticated, requireRole } = require('../middleware/authMiddleware');
const { validateBody, validateQuery } = require('../middleware/validationMiddleware');
const {
  createSlotSchema,
  getAllSlotsQuerySchema,
  generateWeeklySlotsSchema,
} = require('../validation/slotValidation');

// Public routes
router.get('/available', wrapAsync(slotController.getAvailableSlots));

// Admin routes
router.post(
  '/',
  isAuthenticated,
  requireRole('admin'),
  validateBody(createSlotSchema),
  wrapAsync(slotController.createSlot),
);

router.get(
  '/',
  isAuthenticated,
  requireRole('admin'),
  validateQuery(getAllSlotsQuerySchema),
  wrapAsync(slotController.getAllSlots),
);

router.post(
  '/generate-week',
  isAuthenticated,
  requireRole('admin'),
  validateBody(generateWeeklySlotsSchema),
  wrapAsync(slotController.generateWeeklySlots),
);

router.put(
  '/:id',
  isAuthenticated,
  requireRole('admin'),
  wrapAsync(slotController.updateSlot),
);

router.delete(
  '/:id',
  isAuthenticated,
  requireRole('admin'),
  wrapAsync(slotController.deleteSlot),
);

module.exports = router;

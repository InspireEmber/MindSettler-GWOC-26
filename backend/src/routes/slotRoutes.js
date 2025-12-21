const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

// Public routes
router.get('/available', slotController.getAvailableSlots);

// Admin routes (would typically be protected with auth middleware)
router.post('/', slotController.createSlot);
router.get('/', slotController.getAllSlots);
router.put('/:id', slotController.updateSlot);
router.delete('/:id', slotController.deleteSlot);

module.exports = router;

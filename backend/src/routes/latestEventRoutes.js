const express = require('express');
const router = express.Router();
const latestEventController = require('../controllers/latestEventController');
const { validateBody } = require('../middleware/validationMiddleware');
const { latestEventSchema } = require('../validation/latestEventValidation');
const { isAuthenticated, requireRole } = require('../middleware/authMiddleware');

// Public route to get all active events
router.get('/', latestEventController.getActiveEvents);

// Protected routes for admin
router.post('/', isAuthenticated, requireRole('admin'), validateBody(latestEventSchema), latestEventController.createEvent);
router.put('/:id', isAuthenticated, requireRole('admin'), validateBody(latestEventSchema), latestEventController.updateEvent);
router.delete('/:id', isAuthenticated, requireRole('admin'), latestEventController.deleteEvent);
router.get('/all', isAuthenticated, requireRole('admin'), latestEventController.getAllEvents);

module.exports = router;

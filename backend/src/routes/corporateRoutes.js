const express = require('express');
const router = express.Router();
const corporateController = require('../controllers/corporateController');
const wrapAsync = require('../utils/wrapAsync');
const { isAuthenticated, requireRole } = require('../middleware/authMiddleware');
const { validateBody, validateQuery } = require('../middleware/validationMiddleware');
const {
  createCorporateInquirySchema,
  getCorporateInquiriesQuerySchema,
  updateCorporateInquiryStatusSchema,
} = require('../validation/corporateValidation');

// Public: submit a corporate inquiry
router.post(
  '/inquiries',
  validateBody(createCorporateInquirySchema),
  wrapAsync(corporateController.createInquiry),
);

// Admin-only routes
router.get(
  '/inquiries',
  isAuthenticated,
  requireRole('admin'),
  validateQuery(getCorporateInquiriesQuerySchema),
  wrapAsync(corporateController.getInquiries),
);

router.put(
  '/inquiries/:id/status',
  isAuthenticated,
  requireRole('admin'),
  validateBody(updateCorporateInquiryStatusSchema),
  wrapAsync(corporateController.updateInquiryStatus),
);

module.exports = router;
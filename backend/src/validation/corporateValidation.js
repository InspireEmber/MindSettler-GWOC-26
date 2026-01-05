const Joi = require('joi');

// Schema for creating a new corporate inquiry
const createCorporateInquirySchema = Joi.object({
  inquiryType: Joi.string().valid('services', 'sponsorship').required(),
  companyName: Joi.string().trim().required(),
  contactPerson: Joi.string().trim().required(),
  email: Joi.string().trim().email().lowercase().required(),
  phone: Joi.string().trim().allow('').optional(),
  message: Joi.string().trim().allow('').optional(),
  
  // Fields for 'services'
  employeeCount: Joi.when('inquiryType', {
    is: 'services',
    then: Joi.number().integer().min(1).optional().allow(null, ''),
    otherwise: Joi.forbidden()
  }),

  // Fields for 'sponsorship'
  sponsorshipLevel: Joi.when('inquiryType', {
    is: 'sponsorship',
    then: Joi.string().trim().allow('').optional(),
    otherwise: Joi.forbidden()
  }),
  proposedContribution: Joi.when('inquiryType', {
    is: 'sponsorship',
    then: Joi.string().trim().allow('').optional(),
    otherwise: Joi.forbidden()
  }),
});

// Schema for querying inquiries (for admins)
const getCorporateInquiriesQuerySchema = Joi.object({
  status: Joi.string().valid('new', 'in_progress', 'closed'),
  inquiryType: Joi.string().valid('services', 'sponsorship'),
});

// Schema for updating inquiry status
const updateCorporateInquiryStatusSchema = Joi.object({
  status: Joi.string().valid('new', 'in_progress', 'closed').required(),
});

module.exports = {
  createCorporateInquirySchema,
  getCorporateInquiriesQuerySchema,
  updateCorporateInquiryStatusSchema,
};


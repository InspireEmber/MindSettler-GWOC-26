const Joi = require('joi');

const createCorporateInquirySchema = Joi.object({
  companyName: Joi.string().trim().min(2).max(200).required(),
  contactPerson: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().min(5).max(20).optional(),
  employeeCount: Joi.number().integer().min(1).optional(),
  message: Joi.string().trim().allow('', null).optional(),
});

const getCorporateInquiriesQuerySchema = Joi.object({
  status: Joi.string().valid('new', 'in_progress', 'closed').optional(),
});

const updateCorporateInquiryStatusSchema = Joi.object({
  status: Joi.string().valid('new', 'in_progress', 'closed').required(),
});

module.exports = {
  createCorporateInquirySchema,
  getCorporateInquiriesQuerySchema,
  updateCorporateInquiryStatusSchema,
};

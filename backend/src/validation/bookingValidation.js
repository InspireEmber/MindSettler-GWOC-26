const Joi = require('joi');

const createBookingSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().min(5).max(20).required(),
  sessionType: Joi.string().valid('online', 'offline').required(),
  preferredDate: Joi.string().trim().required(), // kept as string to avoid breaking existing payloads
  // For backwards compatibility, support either preferredTime (legacy) or slotId (newer clients)
  preferredTime: Joi.string().trim().optional(), // legacy: slot ID
  slotId: Joi.string().trim().optional(), // new: explicit slot id
  isFirstSession: Joi.boolean().optional(),
  message: Joi.string().trim().allow('', null).optional(),
}).or('preferredTime', 'slotId');

module.exports = {
  createBookingSchema,
};

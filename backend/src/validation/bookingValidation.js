const Joi = require('joi');

// Booking payload now only contains session/slot data; user comes from session
const createBookingSchema = Joi.object({
  sessionType: Joi.string().valid('online', 'offline').required(),
  preferredDate: Joi.string().trim().required(), // kept as string (YYYY-MM-DD)
  // Support either preferredTime (legacy) or slotId (newer clients)
  preferredTime: Joi.string().trim().optional(), // legacy: slot ID
  slotId: Joi.string().trim().optional(), // new: explicit slot id
  isFirstSession: Joi.boolean().optional(),
  message: Joi.string().trim().allow('', null).optional(),
}).or('preferredTime', 'slotId');

module.exports = {
  createBookingSchema,
};

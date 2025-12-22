const Joi = require('joi');

const approveAppointmentSchema = Joi.object({
  meetingLink: Joi.string().uri().trim().optional(),
});

const rejectAppointmentSchema = Joi.object({
  reason: Joi.string().trim().allow('', null).optional(),
});

const updateAppointmentStatusSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'confirmed', 'rejected', 'completed', 'cancelled')
    .required(),
});

const markPaymentSchema = Joi.object({
  paymentMethod: Joi.string().valid('upi', 'cash', 'other').required(),
  paymentReference: Joi.string().trim().allow('', null).optional(),
});

module.exports = {
  approveAppointmentSchema,
  rejectAppointmentSchema,
  updateAppointmentStatusSchema,
  markPaymentSchema,
};

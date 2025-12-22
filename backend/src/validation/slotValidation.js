const Joi = require('joi');

const timeString = Joi.string().pattern(/^\d{2}:\d{2}$/).message('time must be in HH:MM format');

const createSlotSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  startTime: timeString.required(),
  endTime: timeString.optional(),
  sessionType: Joi.string().valid('online', 'offline').required(),
  location: Joi.string().trim().optional(),
});

const getAllSlotsQuerySchema = Joi.object({
  date: Joi.string().isoDate().optional(),
  sessionType: Joi.string().valid('online', 'offline').optional(),
  isAvailable: Joi.string().valid('true', 'false').optional(),
  isBooked: Joi.string().valid('true', 'false').optional(),
});

const generateWeeklySlotsSchema = Joi.object({
  weekStartDate: Joi.string().isoDate().required(),
  daysOfWeek: Joi.array().items(Joi.number().integer().min(0).max(6)).min(1).required(),
  startTime: timeString.required(),
  endTime: timeString.required(),
  slotDurationMinutes: Joi.number().integer().min(15).max(480).default(60),
  sessionType: Joi.string().valid('online', 'offline').required(),
  location: Joi.string().trim().optional(),
  excludeDates: Joi.array().items(Joi.string().isoDate()).default([]),
});

module.exports = {
  createSlotSchema,
  getAllSlotsQuerySchema,
  generateWeeklySlotsSchema,
};

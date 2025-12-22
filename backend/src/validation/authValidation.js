const Joi = require('joi');

// Admin login (username/password)
const loginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().min(4).required(),
});

// User signup
const userSignupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  phone: Joi.string().trim().min(6).max(20).required(),
  password: Joi.string().min(6).max(128).required(),
});

// User login
const userLoginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  loginSchema,
  userSignupSchema,
  userLoginSchema,
};

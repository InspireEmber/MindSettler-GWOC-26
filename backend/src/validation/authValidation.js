const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  loginSchema,
};

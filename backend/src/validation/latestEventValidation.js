const Joi = require('joi');

const latestEventSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
  }),
  googleFormLink: Joi.string().uri().required().messages({
    'string.uri': 'Google Form link must be a valid URL',
    'string.empty': 'Google Form link is required',
  }),
  status: Joi.string().valid('active', 'inactive').optional(),
});

module.exports = {
  latestEventSchema,
};

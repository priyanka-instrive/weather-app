const Joi = require("joi");

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

const locationValidationSchema = {
  body: Joi.object().keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
  }),
};

module.exports = { locationValidationSchema };

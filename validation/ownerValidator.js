const Joi = require('joi');

const ownerValidationSchema = Joi.object({
    fullName: Joi.string().min(3).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = ownerValidationSchema;

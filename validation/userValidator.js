const Joi = require('joi');

const userValidationSchema = Joi.object({
    fullName: Joi.string().min(3).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = userValidationSchema;
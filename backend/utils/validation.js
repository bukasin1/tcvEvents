const joi = require('joi')

exports.userSchema = joi.object({
    email: joi
    .string()
    .trim()
    .lowercase()
    .required(),
    password: joi.string().required(),
    interests: joi.string(),
    admin: joi.boolean()
})

exports.loginSchema = joi.object({
    email: joi
    .string()
    .trim()
    .lowercase()
    .required(),
    password: joi.string().required()
})

exports.eventSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    date: joi.date().required(),
    isVirtual: joi.boolean().required(),
    address: joi.string().required(),
})
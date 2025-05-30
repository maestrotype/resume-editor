const Joi = require('joi');

const validateRegistration = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .pattern(/^[a-zA-Z0-9_]+$/)
            .required()
            .messages({
                'string.pattern.base': 'Username can only contain letters, numbers and underscores',
                'string.min': 'Username must be at least 3 characters long',
                'string.max': 'Username cannot be longer than 30 characters',
                'any.required': 'Username is required'
            }),
        password: Joi.string()
            .min(4)
            .required()
            .messages({
                'string.min': 'Password must be at least 4 characters long',
                'any.required': 'Password is required'
            }),
        avatar: Joi.string().allow(null, '')
    });

    return schema.validate(data, { allowUnknown: true });
};

const validateLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(data);
};

module.exports = {
    validateRegistration,
    validateLogin
}; 
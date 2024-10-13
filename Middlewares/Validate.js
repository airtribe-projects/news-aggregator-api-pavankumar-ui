const Joi = require("joi");

const registrationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .required(),
});

const preferencesSchema = Joi.object({
    country: Joi.string().length(2).required(),
    category: Joi.string()
        .valid(
            "business",
            "entertainment",
            "general",
            "health",
            "science",
            "sports",
            "technology"
        )
        .required(),
    language: Joi.string().length(2)
        .valid("en", "ar", "de", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh")
        .required(),
});


const validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


const validatePreferences = (req, res, next) => {
    const { error } = preferencesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validatePreferences
}
const Joi = require("joi");
const validationErrors = require("../Middlewares/CommonErrHandler");

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
    preferences: Joi.object({
        categories: Joi.string()
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
        languages: Joi.string()
            .length(2)
            .valid("en", "ar", "de", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh")
            .required(),
        country: Joi.string()
            .length(2)
            .required()
    }).required()
});



const validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        validationErrors(error,req,res,next);
    }
    next();
};


const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        validationErrors(error,req,res,next);
    }
    next();
};


const validatePreferences = (req, res, next) => {
    const { error } = preferencesSchema.validate(req.body);
    if (error) {
        validationErrors(error,req,res,next);
    }
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validatePreferences
}


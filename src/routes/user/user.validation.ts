import Joi from "joi";

export const user_create = Joi.object({
    _id: Joi.string().length(24),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const user_update = Joi.object({
    _id: Joi.string().length(24).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
});

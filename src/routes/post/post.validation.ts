import Joi from "joi";

export const post_create = Joi.object({
    _id: Joi.string().length(24),
    user: Joi.string().length(24).required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    created: Joi.date().required(),
    edited: Joi.date(),
});

export const post_update = Joi.object({
    _id: Joi.string().length(24).required(),
    user: Joi.string().length(24),
    title: Joi.string(),
    content: Joi.string(),
    created: Joi.date(),
    edited: Joi.date(),
});

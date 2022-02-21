import Joi from "joi";

export const validateId = Joi.object({
    _id: Joi.string().length(24).required(),
});

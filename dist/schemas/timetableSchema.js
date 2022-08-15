import Joi from 'joi';
export var TimetableSchema = Joi.object({
    value: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required()
});

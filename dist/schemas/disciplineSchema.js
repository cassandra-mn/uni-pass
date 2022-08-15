import Joi from 'joi';
export var DisciplineSchema = Joi.object({
    discipline: Joi.string().required(),
    teacher: Joi.string().required(),
    clasroom: Joi.string().required(),
    color: Joi.string().required()
});

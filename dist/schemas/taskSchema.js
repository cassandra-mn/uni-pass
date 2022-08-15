import Joi from 'joi';
export var TaskSchema = Joi.object({
    task: Joi.string().required(),
    finalDate: Joi.date().required()
});

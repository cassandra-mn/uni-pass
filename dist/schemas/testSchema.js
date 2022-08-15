import Joi from 'joi';
import JoiDate from '@joi/date';
var joi = Joi.extend(JoiDate);
export var TestSchema = Joi.object({
    test: Joi.string().required(),
    date: joi.date().format('YYYY-MM-DD').required()
});

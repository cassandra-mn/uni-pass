import Joi from 'joi';
import JoiDate from '@joi/date';
import {CreateTest} from '../services/testService.js';

const joi = Joi.extend(JoiDate);

export const TestSchema = Joi.object<CreateTest>({
    test: Joi.string().required(),
    date: joi.date().format('YYYY-MM-DD').required()
});
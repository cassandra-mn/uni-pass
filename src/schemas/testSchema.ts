import Joi from 'joi';
import {CreateTest} from '../services/testService.js';

export const DisciplineSchema = Joi.object<CreateTest>({
    test: Joi.string().required(),
    date: Joi.date().required()
});
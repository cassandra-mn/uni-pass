import Joi from 'joi';
import {CreateTask} from '../services/taskService.js';

export const DisciplineSchema = Joi.object<CreateTask>({
    task: Joi.string().required(),
    finalDate: Joi.date().required()
});
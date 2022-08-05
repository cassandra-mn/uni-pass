import Joi from 'joi';
import {CreateTimetable} from '../services/timetableService.js';

export const DisciplineSchema = Joi.object<CreateTimetable>({
    day: Joi.string().required(),
    startTime: Joi.date().required(),
    finalTime: Joi.date().required()
});
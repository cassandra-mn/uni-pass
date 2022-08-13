import Joi from 'joi';
import {CreateTimetable} from '../services/timetableService.js';

export const TimetableSchema = Joi.object<CreateTimetable>({
    value: Joi.string().required(),
    startTime: Joi.date().required(),
    finalTime: Joi.date().required()
});
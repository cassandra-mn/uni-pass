import Joi from 'joi';
import {CreateTimetable} from '../services/timetableService.js';

export const TimetableSchema = Joi.object<CreateTimetable>({
    value: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required()
});
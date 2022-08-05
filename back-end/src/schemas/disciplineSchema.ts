import Joi from 'joi';
import {CreateDiscipline} from '../services/disciplineService.js';

export const DisciplineSchema = Joi.object<CreateDiscipline>({
    discipline: Joi.string().required(),
    teacher: Joi.string().required(),
    clasroom: Joi.string().required(),
    color: Joi.string().required()
});
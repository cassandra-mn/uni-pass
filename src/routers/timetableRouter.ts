import {Router} from 'express';

import {createTimetable} from '../controllers/timetableController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {TimetableSchema} from '../schemas/timetableSchema.js';

const timetableRouter = Router();

timetableRouter.post('/timetable/create/:disciplineId', validateSchemaMiddleware(TimetableSchema), createTimetable);

export default timetableRouter;
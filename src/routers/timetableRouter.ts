import {Router} from 'express';

import {createTimetable, findTimetables} from '../controllers/timetableController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {TimetableSchema} from '../schemas/timetableSchema.js';

const timetableRouter = Router();

timetableRouter.post('/timetable/create/:disciplineId', validateSchemaMiddleware(TimetableSchema), createTimetable);
timetableRouter.get('/timetables', findTimetables);

export default timetableRouter;
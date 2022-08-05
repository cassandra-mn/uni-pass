import {Router} from 'express';

import {createDiscipline, findDisciplines, findDisciplineById, updateDiscipline, deleteDiscipline} from '../controllers/disciplineController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {DisciplineSchema} from '../schemas/disciplineSchema.js';

const disciplineRouter = Router();

disciplineRouter.post('/discipline/create', validateSchemaMiddleware(DisciplineSchema), createDiscipline);
disciplineRouter.get('/disciplines', findDisciplines);
disciplineRouter.get('/discipline/:id', findDisciplineById);
disciplineRouter.put('/discipline/update/:id', validateSchemaMiddleware(DisciplineSchema), updateDiscipline);
disciplineRouter.delete('/discipline/delete/:id', deleteDiscipline);

export default disciplineRouter;
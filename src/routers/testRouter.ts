import {Router} from 'express';

import {createTest, findTests} from '../controllers/testController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {TestSchema} from '../schemas/testSchema.js';

const testRouter = Router();

testRouter.post('/test/create/:disciplineId', validateSchemaMiddleware(TestSchema), createTest);
testRouter.get('/tests', findTests);

export default testRouter;
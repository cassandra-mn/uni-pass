import {Router} from 'express';

import {validateTokenMiddleware} from '../middlewares/validateTokenMiddleware.js';
import authRouter from './authRouter.js';
import disciplineRouter from './disciplineRouter.js';
import taskRouter from './taskRouter.js';
import testRouter from './testRouter.js';
import timetableRouter from './timetableRouter.js';

const router = Router();

router.use(authRouter);
router.use(validateTokenMiddleware);
router.use(disciplineRouter);
router.use(taskRouter);
router.use(testRouter);
router.use(timetableRouter);

export default router;
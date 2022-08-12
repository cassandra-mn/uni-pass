import {Router} from 'express';

import {createTask, deleteTask, findTask, updateTask} from '../controllers/taskController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {TaskSchema} from '../schemas/taskSchema.js';
 
const taskRouter = Router();

taskRouter.post('/task/create/:disciplineId', validateSchemaMiddleware(TaskSchema), createTask);
taskRouter.get('/tasks', findTask);
taskRouter.put('/task/update/:id', updateTask);
taskRouter.delete('/task/delete/:id', deleteTask);

export default taskRouter;
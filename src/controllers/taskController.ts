import {Request, Response} from 'express';

import * as taskService from '../services/taskService.js';

export async function createTask(req: Request, res: Response) {
    const task = req.body;
    const {disciplineId} = req.params;
    const {userId} = res.locals;
    
    await taskService.createTest(userId, +disciplineId, task);
    res.sendStatus(201);
} 

export async function findTask(req: Request, res: Response) {
    const {userId} = res.locals;

    const tasks = await taskService.findTasks(userId);
    res.status(200).send(tasks);
}

export async function updateTask(req: Request, res: Response) {
    const {id} = req.params;
    const task = req.body;

    await taskService.updateTask(+id, task);
    res.sendStatus(200);
}

export async function deleteTask(req: Request, res: Response) {
    const {id} = req.params;

    await taskService.deleteTask(+id);
    res.sendStatus(200);
}
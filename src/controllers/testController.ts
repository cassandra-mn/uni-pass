import {Request, Response} from 'express';

import * as testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const {test, date} = req.body;
    const {disciplineId} = req.params;
    const {userId} = res.locals;
    
    await testService.createTest(userId, +disciplineId, {test, date});
    res.sendStatus(201);
} 

export async function findTests(req: Request, res: Response) {
    const {userId} = res.locals;

    const tests = await testService.findTests(userId);
    res.status(200).send(tests);
}

export async function updateTest(req: Request, res: Response) {
    const {id} = req.params;
    const test = req.body;

    await testService.updateTest(+id, test);
    res.sendStatus(200);
}

export async function deleteTest(req: Request, res: Response) {
    const {id} = req.params;

    await testService.deleteTest(+id);
    res.sendStatus(200);
}
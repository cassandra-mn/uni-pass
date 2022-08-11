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
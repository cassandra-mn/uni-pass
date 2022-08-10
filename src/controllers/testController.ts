import {Request, Response} from 'express';

import * as testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const {test, date} = req.body;
    const {disciplineId} = req.params;
    const {userId} = res.locals;
    
    await testService.createTest(userId, +disciplineId, {test, date});
    res.sendStatus(201);
} 
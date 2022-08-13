import {Request, Response} from 'express';

import * as timetableService from '../services/timetableService.js';

export async function createTimetable(req: Request, res: Response) {
    const {disciplineId} = req.params;
    const {userId} = res.locals;
    const timetable = req.body;

    await timetableService.createTimetable(userId, +disciplineId, timetable);
    res.sendStatus(201);
}
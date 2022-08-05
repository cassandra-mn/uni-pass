import {Request, Response} from 'express';

import * as disciplineService from '../services/disciplineService.js';

export async function createDiscipline(req: Request, res: Response) {
    const discipline: disciplineService.CreateDiscipline = req.body;
    const {userId} = res.locals;
    
    await disciplineService.createDiscipline(discipline, userId);
    res.sendStatus(201);
}

export async function findDisciplines(req: Request, res: Response) {
    
    res.sendStatus(501);
}

export async function updateDiscipline(req: Request, res: Response) {

    res.sendStatus(501);
}

export async function deleteDiscipline(req: Request, res: Response) {

    res.sendStatus(501);
}
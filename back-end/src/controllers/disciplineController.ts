import {Request, Response} from 'express';

import * as disciplineService from '../services/disciplineService.js';

export async function createDiscipline(req: Request, res: Response) {
    const discipline: disciplineService.CreateDiscipline = req.body;
    const {userId} = res.locals;
    
    await disciplineService.createDiscipline(discipline, userId);
    res.sendStatus(201);
}

export async function findDisciplines(req: Request, res: Response) {
    const {userId} = res.locals;

    const disciplines = await disciplineService.findDisciplines(userId);
    res.status(200).send(disciplines);
}

export async function findDisciplineById(req: Request, res: Response) {
    const {id} = req.params;
    const {userId} = res.locals;

    const discipline = await disciplineService.findDisciplineById(+id, userId);
    res.status(200).send(discipline);
}

export async function updateDiscipline(req: Request, res: Response) {
    const {id} = req.params;
    const {userId} = res.locals;
    const discipline = req.body;
    
    await disciplineService.updateDiscipline(+id, userId, discipline);
    res.sendStatus(200);
}

export async function deleteDiscipline(req: Request, res: Response) {
    const {id} = req.params;
    const {userId} = res.locals;

    await disciplineService.deleteDiscipline(+id, userId);
    res.sendStatus(200);
}
import {Request, Response} from 'express';

import * as disciplineService from '../services/disciplineService.js';

export async function createDiscipline(req: Request, res: Response) {
    const discipline: disciplineService.CreateDiscipline = req.body;
    const {userId} = res.locals;
    
    await disciplineService.createDiscipline(discipline, +userId);
    res.sendStatus(201);
}

export async function findDisciplines(req: Request, res: Response) {
    const {userId} = res.locals;

    const disciplines = await disciplineService.findDisciplines(+userId);
    if (!disciplines) throw {type: 'not_found', message: 'não há disciplinas cadastradas'};

    res.status(200).send(disciplines);
}

export async function findDisciplineById(req: Request, res: Response) {
    const {id} = req.params;
    const {userId} = res.locals;

    const discipline = await disciplineService.findDisciplineById(+id, +userId);
    if (!discipline) throw {type: 'not_found', message: 'disciplina não encontrada'};

    res.status(200).send(discipline);
}

export async function updateDiscipline(req: Request, res: Response) {

    res.sendStatus(501);
}

export async function deleteDiscipline(req: Request, res: Response) {

    res.sendStatus(501);
}
import {Discipline} from '@prisma/client';

import * as disciplineRepository from '../repositories/disciplineRepository.js';

export type CreateDiscipline = Omit<Discipline, "id" | "userId">;

export async function createDiscipline(discipline: CreateDiscipline, userId: number) {
    const existingDiscipline = await disciplineRepository.findDisciplineByName(discipline.discipline, userId);
    if (existingDiscipline) throw {type: 'conflict', message: 'disciplina já cadastrada'};

    await disciplineRepository.createDiscipline(discipline, userId);
}

export async function findDisciplines(userId: number) {
    const disciplines = await disciplineRepository.findDisciplines(userId);
    return disciplines;
}

export async function findDisciplineById(id: number, userId: number) {
    return await validateDiscipline(id, userId);
}

export async function updateDiscipline(id: number, userId: number, disciplineData: CreateDiscipline) {
    await validateDiscipline(id, userId);

    await disciplineRepository.updateDiscipline(id, userId, disciplineData);
}

export async function deleteDiscipline(id: number, userId: number) {
    await validateDiscipline(id, userId);

    await disciplineRepository.deleteDiscipline(id, userId);
}

async function validateDiscipline(id: number, userId: number) {
    const discipline = await disciplineRepository.findDisciplineById(id, userId);
    if (!discipline) throw {type: 'not_found', message: 'disciplina não encontrada'};

    return discipline;
}
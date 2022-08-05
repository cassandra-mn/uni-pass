import {Discipline} from '@prisma/client';

import * as disciplineRepository from '../repositories/disciplineRepository.js';

export type CreateDiscipline = Omit<Discipline, "id" | "userId">;

export async function createDiscipline(discipline: CreateDiscipline, userId: number) {
    const existingDiscipline = await disciplineRepository.findDisciplineByName(discipline.discipline, userId);
    if (existingDiscipline) throw {type: 'conflict', message: 'disciplina já cadastrada'};

    await disciplineRepository.createDiscipline(discipline, userId);
}

export async function findDisciplines(userId: number) {
    return await disciplineRepository.findDisciplines(userId);
}

export async function findDisciplineById(id: number, userId: number) {
    return await disciplineRepository.findDisciplineById(id, userId);
}
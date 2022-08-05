import {Discipline} from '@prisma/client';

import * as disciplineRepository from '../repositories/disciplineRepository.js';

export type CreateDiscipline = Omit<Discipline, "id" | "userId">;

export async function createDiscipline(discipline: CreateDiscipline, userId: number) {
    const existingDiscipline = await disciplineRepository.findDisciplineByName(discipline.discipline, userId);
    if (existingDiscipline) throw {type: 'conflict', message: 'disciplina já cadastrada'};
    
    await disciplineRepository.createDiscipline(discipline, userId);
}
import {Timetable} from '@prisma/client';

import * as utils from '../utils/utils.js';
import * as timetableRepository from '../repositories/timetableRepository.js';

export type CreateTimetable = Omit<Timetable, "id" | "disciplineUserId">;

export async function createTimetable(userId: number, disciplineId: number, timetable: CreateTimetable) {
    const disciplineUser = await utils.findDisciplineUserId(userId, disciplineId);
    if (!disciplineUser) throw {type: 'not_found', message: 'disciplina não encontrada'}; 

    await timetableRepository.createTimetable(disciplineUser.id, timetable);
}
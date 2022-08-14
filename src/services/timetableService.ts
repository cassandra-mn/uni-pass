import {Timetable} from '@prisma/client';

import * as utils from '../utils/utils.js';
import * as timetableRepository from '../repositories/timetableRepository.js';

export type CreateTimetable = Omit<Timetable, "id" | "disciplineUserId">;

export async function createTimetable(userId: number, disciplineId: number, timetable: CreateTimetable) {
    const disciplineUser = await utils.findDisciplineUserId(userId, disciplineId);
    if (!disciplineUser) throw {type: 'not_found', message: 'disciplina não encontrada'}; 

    await timetableRepository.createTimetable(disciplineUser.id, timetable);
}

export async function findTimetables(userId: number) {
    const timetables = await timetableRepository.findTimetables(userId);
    const timetablesFormated = [];
    for (let timetable of timetables) {
        const {timetables, discipline} = timetable;
        if (timetables.length > 0) {
            timetables.forEach(timetable => timetablesFormated.push({...timetable, ...discipline}));
        }
    }
    return timetablesFormated;
}

export async function deleteTimetable(id: number) {
    await timetableRepository.deleteTimetable(id); 
}
import prisma from '../config/database.js';
import {CreateTimetable} from '../services/timetableService.js';

export async function createTimetable(disciplineUserId: number, timetable: CreateTimetable) {
    await prisma.timetable.create({data: {...timetable, disciplineUserId}});
}
import prisma from '../config/database.js';
import {CreateTimetable} from '../services/timetableService.js';

export async function createTimetable(disciplineUserId: number, timetable: CreateTimetable) {
    await prisma.timetable.create({data: {...timetable, disciplineUserId}});
}

export async function findTimetables(userId: number) {
    return await prisma.disciplineUser.findMany({
        where: {userId},
        select: {
            timetables: {},
            discipline: {
                select: {
                    discipline: true,
                    teacher: true,
                    clasroom: true,
                    color: true
                }
            }
        }
    })
}

export async function deleteTimetable(id: number) {
    await prisma.timetable.delete({where: {id}});
}
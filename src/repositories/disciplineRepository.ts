import prisma from '../config/database.js';
import {CreateDiscipline} from '../services/disciplineService.js';

export async function createDiscipline(discipline: CreateDiscipline, userId: number) {
    const disciplineCreate = await prisma.discipline.create({data: {...discipline, userId}});
    await prisma.disciplineUser.create({data: {userId, disciplineId: disciplineCreate.id}});
}

export async function findDisciplineByName(discipline: string, userId: number) {
    return await prisma.discipline.findFirst({where: {discipline, userId}});
}

export async function findDisciplines(userId: number) {
    return await prisma.discipline.findMany({where: {userId}});
}

export async function findDisciplineById(id: number, userId: number) {
    return await prisma.discipline.findUnique({
        where: {id},
        include: {
            disciplinesUsers: {
                select: {
                    tests: {},
                    tasks: {},
                    timetables: {}
                }
            }
        }
    });
}

export async function updateDiscipline(id: number, userId: number, discipline: CreateDiscipline) {
    await prisma.discipline.updateMany({where: {id, userId}, data: discipline});
}

export async function deleteDiscipline(id: number) {
    await prisma.discipline.delete({where: {id}});
}
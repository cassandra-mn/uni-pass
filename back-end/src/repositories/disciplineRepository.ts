import prisma from '../config/database.js';
import {CreateDiscipline} from '../services/disciplineService.js';

export async function createDiscipline(discipline: CreateDiscipline, userId: number) {
    await prisma.discipline.create({data: {...discipline, userId}});
}

export async function findDisciplineByName(discipline: string, userId: number) {
    return await prisma.discipline.findFirst({where: {discipline, userId}});
}

export async function findDisciplines(userId: number) {
    return await prisma.discipline.findMany({where: {userId}});
}

export async function findDisciplineById(id: number, userId: number) {
    return await prisma.discipline.findFirst({where: {id, userId}});
}

export async function updateDiscipline(id: number, userId: number, discipline: CreateDiscipline) {
    await prisma.discipline.updateMany({where: {id, userId}, data: discipline});
}
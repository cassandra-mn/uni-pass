import prisma from '../config/database.js';
import {CreateTest} from '../services/testService.js';

export async function createTest(disciplineUserId: number, test: CreateTest) {
    await prisma.test.create({data: {test: test.test, date: new Date(test.date), disciplineUserId}});
}

export async function findTestById(id: number) {
    return await prisma.test.findFirst({where: {id}});
}

export async function findTestByName(test: string, disciplineUserId: number) {
    return await prisma.test.findFirst({where: {test, disciplineUserId}});
}

export async function findTests(userId: number) {
    return await prisma.disciplineUser.findMany({
        where: {userId},
        select: {
            id: false,
            tests: {}, 
            discipline: {
                select: {
                    discipline: true,
                    teacher: true,
                    clasroom: true,
                    color: true
                }
            }
        }
    });
}

export async function updateTest(id: number, test: CreateTest) {
    await prisma.test.updateMany({where: {id}, data: {test: test.test, date: new Date(test.date)}});
}

export async function deleteTest(id: number) {
    await prisma.test.delete({where: {id}});
}
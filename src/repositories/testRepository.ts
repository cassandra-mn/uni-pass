import prisma from '../config/database.js';
import {CreateTest} from '../services/testService.js';

export async function createTest(disciplineUserId: number, test: CreateTest) {
    await prisma.test.create({data: {test: test.test, date: new Date(test.date), disciplineUserId}});
}

export async function findTestByName(test: string, disciplineUserId: number) {
    return await prisma.test.findFirst({where: {test, disciplineUserId}});
}

export async function findTests(userId: number) {
    return await prisma.disciplineUser.findMany({
        where: {userId},
        select: {
            tests: {}, 
            discipline: {}
        }
    });
}

export async function findTestById(id: number) {

}

export async function updateTest() {

}

export async function deleteTest() {

}
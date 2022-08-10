import prisma from '../config/database.js';

export async function findDisciplineUserId(userId: number, disciplineId: number) {
    return await prisma.disciplineUser.findUnique({where: {disciplineId_userId: {userId, disciplineId}}});
}
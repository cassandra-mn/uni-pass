import prisma from '../config/database.js';
import {CreateUser} from '../services/authService.js';

export async function createUser(user: CreateUser) {
    await prisma.user.create({data: user});
}

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({where: {email}});
    return user;
}
import prisma from '../config/database.js';
import {CreateUser} from '../services/userService.js';

export async function createUser(user: CreateUser) {
    await prisma.user.create({data: user});
}

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({where: {email}});
}

export async function findUserById(id: number) {
    return await prisma.user.findUnique({where: {id}});
}

export async function updateUser(id: number, user: CreateUser) {
    await prisma.user.update({where: {id}, data: user});
}

export async function deleteUser(id: number) {
    await prisma.user.delete({where: {id}});
}
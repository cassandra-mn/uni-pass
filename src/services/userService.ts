import {User} from '@prisma/client';
import bcrypt from 'bcrypt';

import * as authRepository from '../repositories/authRepository.js';

export type CreateUser = Omit<User, "id">;
export type UserData = Omit<CreateUser, "name">;

export async function getUserById(id: number) {
    return validateUser(id);
}

export async function updateUser(id: number, user: CreateUser) {
    const userData = await validateUser(id);

    await authRepository.updateUser(id, {...userData, ...user});
}

export async function deleteUser(id: number, confirmPassword: string) {
    const user = await validateUser(id);
    
    const correctPassword = user ? bcrypt.compareSync(confirmPassword, user.password) : undefined;
    if (!correctPassword) throw {type: 'unauthorized', message: 'senha incorreta'};

    await authRepository.deleteUser(id);
}

async function validateUser(id: number) {
    const user = await authRepository.findUserById(id);
    if (!user) throw {type: 'not_found', message: 'usuário não encontrado'};

    return user;
} 
import {User} from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as authRepository from '../repositories/authRepository.js';

export type CreateUser = Omit<User, "id">;
export type UserData = Omit<CreateUser, "name">;

export async function createUser(user: CreateUser) {
    const existingUser = await authRepository.findUserByEmail(user.email);
    if (existingUser) throw {type: 'conflict', message: 'o e-mail já está sendo utilzado'};
    
    const password: string = bcrypt.hashSync(user.password, 10);
    await authRepository.createUser({...user, password});
}

export async function login(userData: UserData) {
    const user = await authRepository.findUserByEmail(userData.email);
    const isOk = user ? bcrypt.compareSync(userData.password, user.password) : undefined;
    if (!user || !isOk) throw {type: 'unauthorized', message: 'e-mail ou senha incorretos'};

    const token = jwt.sign(user, process.env.JWT_SECRET);
    return token;
}
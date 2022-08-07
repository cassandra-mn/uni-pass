import {Request, Response} from 'express';

import * as authService from '../services/authService.js';

export async function signUp(req: Request, res: Response) {
    const user: authService.CreateUser = req.body;
    await authService.createUser(user);
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const user: authService.UserData = req.body;
    const response = await authService.login(user);
    res.status(200).send(response);
}
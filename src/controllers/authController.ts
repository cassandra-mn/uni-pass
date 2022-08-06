import {Request, response, Response} from 'express';

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

export async function getUserById(req: Request, res: Response) {
    const {id} = req.params;
    const user = await authService.getUserById(+id);
    res.status(200).send(user);
}

export async function updateUser(req: Request, res: Response) {
    const {id} = req.params; 
    const user = req.body;   
    await authService.updateUser(+id, user);
    res.sendStatus(200);
}

export async function deleteUser(req: Request, res: Response) {
    const {id} = req.params;  
    await authService.deleteUser(+id);
    res.sendStatus(200);
}
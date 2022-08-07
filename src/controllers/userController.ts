import {Request, Response} from 'express';

import * as userService from '../services/userService.js';

export async function getUserById(req: Request, res: Response) {
    const {id} = req.params;
    const user = await userService.getUserById(+id);
    res.status(200).send(user);
}

export async function updateUser(req: Request, res: Response) {
    const {id} = req.params; 
    const user = req.body;   
    await userService.updateUser(+id, user);
    res.sendStatus(200);
}

export async function deleteUser(req: Request, res: Response) {
    const {id} = req.params;  
    const {confirmPassword} = req.body;
    await userService.deleteUser(+id, confirmPassword);
    res.sendStatus(200);
}
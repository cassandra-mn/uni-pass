import prisma from '../config/database.js';
import {CreateTask} from '../services/taskService.js';

export async function createTask(disciplineUserId: number, task: CreateTask) {
    await prisma.task.create({data: {task: task.task, finalDate: new Date(task.finalDate), disciplineUserId}});
}

export async function findTaskByName(task: string, disciplineUserId: number) {
    return await prisma.task.findFirst({where: {task, disciplineUserId}});
}
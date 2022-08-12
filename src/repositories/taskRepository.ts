import prisma from '../config/database.js';
import {CreateTask} from '../services/taskService.js';

export async function createTask(disciplineUserId: number, task: CreateTask) {
    await prisma.task.create({data: {task: task.task, finalDate: new Date(task.finalDate), disciplineUserId}});
}

export async function findTaskById(id: number) {
    return await prisma.task.findFirst({where: {id}});
}

export async function findTaskByName(task: string, disciplineUserId: number) {
    return await prisma.task.findFirst({where: {task, disciplineUserId}});
}

export async function findTasks(userId: number) {
    return await prisma.disciplineUser.findMany({
        where: {userId},
        select: {
            id: false,
            tasks: {}, 
            discipline: {
                select: {
                    discipline: true,
                    teacher: true,
                    clasroom: true,
                    color: true
                }
            }
        }
    });
}
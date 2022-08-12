import {Task} from '@prisma/client';

import * as utils from '../utils/utils.js';
import * as taskRepository from '../repositories/taskRepository.js';

export type CreateTask = Omit<Task, "id" | "disciplineUserId" | "startDate">;

export async function createTest(userId: number, disciplineId: number, task: CreateTask) {
    const disciplineUser = await utils.findDisciplineUserId(userId, disciplineId);
    if (!disciplineUser) throw {type: 'not_found', message: 'disciplina não encontrada'}; 

    const taskExisting = await taskRepository.findTaskByName(task.task, disciplineUser.id);
    if (taskExisting) throw {type: 'conflict', message: 'tarefa já cadastrada'}; 

    await taskRepository.createTask(disciplineUser.id, task);
}

export async function findTasks(userId: number) {
    const tasks = await taskRepository.findTasks(userId);
    const allTasks = [];
    for (let task of tasks) {
        const {tasks, discipline} = task;
        if (tasks.length !== 0) {
            tasks.forEach(task => allTasks.push({id: task.id, ...task, ...discipline}));
        }
    }
    return allTasks.sort((i, j) => i.date - j.date);
}

export async function updateTask(id: number, task: CreateTask) {
    await validateTask(id);

    await taskRepository.updateTask(id, task);
}

export async function deleteTask(id: number) {
    await validateTask(id);
    
    await taskRepository.deleteTask(id);
}

export async function validateTask(id: number) {
    const validateTask = await taskRepository.findTaskById(id);
    if (!validateTask) throw {type: 'not_found', message: 'tarefa não encontrada'};
}
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
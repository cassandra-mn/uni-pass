import {Task} from '@prisma/client';

export type CreateTask = Omit<Task, "id" | "disciplineUserId" | "startDate">;
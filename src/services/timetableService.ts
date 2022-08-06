import {Timetable} from '@prisma/client';

export type CreateTimetable = Omit<Timetable, "id" | "disciplineUserId">;
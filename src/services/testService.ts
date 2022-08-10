import {Test} from '@prisma/client';

import * as utils from '../utils/utils.js';
import * as testRepository from '../repositories/testRepository.js';

export type CreateTest = Omit<Test, "id" | "disciplineUserId">;

export async function createTest(userId: number, disciplineId: number, test: CreateTest) {
    const testExisting = await testRepository.findTestByName(test.test);
    if (testExisting) throw {type: 'conflict', message: 'prova já cadastrada'}; 

    const disciplineUser = await utils.findDisciplineUserId(userId, disciplineId);
    await testRepository.createTest(disciplineUser.id, test);
}
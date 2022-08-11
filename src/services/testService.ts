import {Test} from '@prisma/client';

import * as utils from '../utils/utils.js';
import * as testRepository from '../repositories/testRepository.js';

export type CreateTest = Omit<Test, "id" | "disciplineUserId">;

export async function createTest(userId: number, disciplineId: number, test: CreateTest) {
    const disciplineUser = await utils.findDisciplineUserId(userId, disciplineId);
    if (!disciplineUser) throw {type: 'not_found', message: 'disciplina não encontrada'}; 

    const testExisting = await testRepository.findTestByName(test.test, disciplineUser.id);
    if (testExisting) throw {type: 'conflict', message: 'prova já cadastrada'}; 

    await testRepository.createTest(disciplineUser.id, test);
}

export async function findTests(userId: number) {
    const tests = await testRepository.findTests(userId);
    const allTests = [];
    for (let test of tests) {
        const {tests, discipline} = test;
        if (tests.length !== 0) {
            tests.forEach(test => allTests.push({id: test.id, ...test, ...discipline}));
        }
    }
    return allTests.sort((i, j) => i.date - j.date);
}

export async function updateTest(id: number, test: CreateTest) {
    validateTest(id);

    await testRepository.updateTest(id, test);
}

export async function deleteTest(id: number) {
    validateTest(id);
    
    await testRepository.deleteTest(id);
}

export async function validateTest(id: number) {
    const validateTest = await testRepository.findTestById(id);
    if (!validateTest) throw {type: 'not_found', message: 'prova não encontrada'};
}
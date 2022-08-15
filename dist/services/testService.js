var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as utils from '../utils/utils.js';
import * as testRepository from '../repositories/testRepository.js';
export function createTest(userId, disciplineId, test) {
    return __awaiter(this, void 0, void 0, function () {
        var disciplineUser, testExisting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils.findDisciplineUserId(userId, disciplineId)];
                case 1:
                    disciplineUser = _a.sent();
                    if (!disciplineUser)
                        throw { type: 'not_found', message: 'disciplina não encontrada' };
                    return [4 /*yield*/, testRepository.findTestByName(test.test, disciplineUser.id)];
                case 2:
                    testExisting = _a.sent();
                    if (testExisting)
                        throw { type: 'conflict', message: 'prova já cadastrada' };
                    return [4 /*yield*/, testRepository.createTest(disciplineUser.id, test)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function findTests(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var tests, allTests, _loop_1, _i, tests_1, test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findTests(userId)];
                case 1:
                    tests = _a.sent();
                    allTests = [];
                    _loop_1 = function (test) {
                        var tests_2 = test.tests, discipline = test.discipline;
                        if (tests_2.length !== 0) {
                            tests_2.forEach(function (test) { return allTests.push(__assign(__assign({ id: test.id }, test), discipline)); });
                        }
                    };
                    for (_i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
                        test = tests_1[_i];
                        _loop_1(test);
                    }
                    return [2 /*return*/, allTests.sort(function (i, j) { return i.date - j.date; })];
            }
        });
    });
}
export function updateTest(id, test) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTest(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testRepository.updateTest(id, test)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function deleteTest(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTest(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testRepository.deleteTest(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function validateTest(id) {
    return __awaiter(this, void 0, void 0, function () {
        var validateTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findTestById(id)];
                case 1:
                    validateTest = _a.sent();
                    if (!validateTest)
                        throw { type: 'not_found', message: 'prova não encontrada' };
                    return [2 /*return*/];
            }
        });
    });
}

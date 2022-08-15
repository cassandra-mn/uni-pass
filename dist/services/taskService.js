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
import * as taskRepository from '../repositories/taskRepository.js';
export function createTest(userId, disciplineId, task) {
    return __awaiter(this, void 0, void 0, function () {
        var disciplineUser, taskExisting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils.findDisciplineUserId(userId, disciplineId)];
                case 1:
                    disciplineUser = _a.sent();
                    if (!disciplineUser)
                        throw { type: 'not_found', message: 'disciplina não encontrada' };
                    return [4 /*yield*/, taskRepository.findTaskByName(task.task, disciplineUser.id)];
                case 2:
                    taskExisting = _a.sent();
                    if (taskExisting)
                        throw { type: 'conflict', message: 'tarefa já cadastrada' };
                    return [4 /*yield*/, taskRepository.createTask(disciplineUser.id, task)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function findTasks(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, allTasks, _loop_1, _i, tasks_1, task;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, taskRepository.findTasks(userId)];
                case 1:
                    tasks = _a.sent();
                    allTasks = [];
                    _loop_1 = function (task) {
                        var tasks_2 = task.tasks, discipline = task.discipline;
                        if (tasks_2.length !== 0) {
                            tasks_2.forEach(function (task) { return allTasks.push(__assign(__assign({ id: task.id }, task), discipline)); });
                        }
                    };
                    for (_i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                        task = tasks_1[_i];
                        _loop_1(task);
                    }
                    return [2 /*return*/, allTasks.sort(function (i, j) { return i.finalDate - j.finalDate; })];
            }
        });
    });
}
export function updateTask(id, task) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTask(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, taskRepository.updateTask(id, task)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateTask(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, taskRepository.deleteTask(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function validateTask(id) {
    return __awaiter(this, void 0, void 0, function () {
        var validateTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, taskRepository.findTaskById(id)];
                case 1:
                    validateTask = _a.sent();
                    if (!validateTask)
                        throw { type: 'not_found', message: 'tarefa não encontrada' };
                    return [2 /*return*/];
            }
        });
    });
}

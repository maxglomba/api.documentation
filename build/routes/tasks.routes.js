"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = __importDefault(require("../controllers/tasks.controller"));
const router = (0, express_1.Router)();
router.get('/tasks', tasks_controller_1.default.getAll);
router.get('/tasks/count', tasks_controller_1.default.getCounter);
router.post('/tasks', tasks_controller_1.default.create);
router.get('/tasks/:id', tasks_controller_1.default.getOne);
router.delete('/tasks/:id', tasks_controller_1.default.deleteOne);
router.put('/tasks/:id', tasks_controller_1.default.update);
exports.default = router;

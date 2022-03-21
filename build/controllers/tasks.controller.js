"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const nanoid_1 = require("nanoid");
const getAll = (req, res) => {
    const data = (0, db_1.getConnection)().get('tasks').value();
    res.json(data);
};
const getCounter = (req, res) => {
    const data = (0, db_1.getConnection)().get('tasks').value();
    res.json({ quantity: data.length });
};
const getOne = (req, res) => {
    const { id } = req.params;
    try {
        const tasks = (0, db_1.getConnection)().get('tasks');
        let task = tasks.find({ id: id });
        if (task.value()) {
            return res.json(task);
        }
    }
    catch (error) {
        return res.status(500).send();
    }
    return res.status(404).send();
};
const create = (req, res) => {
    const { name, description } = req.body;
    try {
        const tasks = (0, db_1.getConnection)().get('tasks');
        if (name && description) {
            if (tasks.find({ name: name }).value()) {
                return res.status(400).send('Task already exists.');
            }
            const newTask = {
                id: (0, nanoid_1.nanoid)(),
                name,
                description
            };
            try {
                tasks.push(newTask).write();
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).send(error);
            }
        }
        return res.status(400).send();
    }
    catch (error) {
        return res.status(500).send();
    }
};
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tasks = (0, db_1.getConnection)().get('tasks');
        if (id) {
            let task = tasks.find({ id: id });
            if (task.value()) {
                tasks.remove({ id: id }).write();
                return res.json();
            }
        }
        return res.status(404).send();
    }
    catch (error) {
        return res.status(500).send();
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const tasks = (0, db_1.getConnection)().get('tasks');
        let task = tasks.find({ id: id });
        if (task.value()) {
            if (name)
                tasks.find({ id: id }).assign({ name: name }).write();
            if (name)
                tasks.find({ id: id }).assign({ description: description }).write();
            return res.json();
        }
    }
    catch (error) {
        return res.status(500).send();
    }
    return res.status(404).send();
});
exports.default = {
    getAll,
    getCounter,
    getOne,
    create,
    deleteOne,
    update
};

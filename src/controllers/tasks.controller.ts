import { Handler } from 'express';
import { getConnection, Task } from '../db';
import { nanoid } from 'nanoid';


const getAll: Handler = (req, res) => {
    const data = getConnection().get('tasks').value();
    res.json(data);
};

const getCounter: Handler = (req, res) => {
    const data = getConnection().get('tasks').value();
    res.json(data.length);
};

const getOne: Handler = (req, res) => {
    const { id } = req.params;
    try {
        const tasks = getConnection().get('tasks');
        let task = tasks.find({id: id});
        if (task.value()) {
            return res.json(task);
        }
    } catch (error) {
        return res.status(500).send();
    }
    return res.status(404).json({msg: "The task not found"});
};

const create: Handler = (req, res) => {
    const { name, description } = req.body;
    try {
        const tasks = getConnection().get('tasks');
        if (name && description) {
            if(tasks.find({name: name}).value()){
                return res.status(400).json({msg:'Task already exists.'});
            }
            const newTask = {
                id: nanoid(),
                name,
                description
            };
            try {
                tasks.push(newTask).write();
                return res.status(201).json(newTask);
            } catch (error) {
                return res.status(500).send(error);
            }

        }
        return res.status(400).send();
    } catch (error) {
        return res.status(500).send();
    }

}

const deleteOne: Handler = async (req, res) => {
    const { id } = req.params;
    try {
        const tasks = getConnection().get('tasks');
        if (id) {
            let task = tasks.find({id: id});
            if (task.value()) {
                tasks.remove({id: id}).write();
                return res.json(task);
            }
        }
        return res.status(404).json({msg: "The task not found"});
    } catch (error) {
        return res.status(500).send();
    }
};

const update: Handler = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const tasks = getConnection().get('tasks');
        let task = tasks.find({id: id});
        if (task.value()) {
            if(name) tasks.find({id: id}).assign({name: name}).write();
            if(name) tasks.find({id: id}).assign({description: description}).write();
            return res.json(task);
        }
    } catch (error) {
        return res.status(500).send();
    }
    return res.status(404).json({msg: "The task not found"});

};



export default {
    getAll,
    getCounter,
    getOne,
    create,
    deleteOne,
    update
}
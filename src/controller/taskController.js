const express = require('express');
const TaskModel = require('../model/TaskModel');

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
  try {
    taskModel = new TaskModel();
    const result = await taskModel.getAllTasks();
    if(result.length === 0)
      throw new Error('Error getting all tasks');
    else
    res.status(200).send(result);
  }catch(err){
    res.status(400).send({error: err.message});
  }
})

taskRouter.get('/:id', async (req, res) => {
  try {
    taskModel = new TaskModel();
    const result = await taskModel.getTaskById(req.params.id);
    if(result.length === 0)
      throw new Error('Task not found');
    res.status(200).send(result);
  }catch(err){
    if(err.message === 'Task not found')
      res.status(404).send({error: err.message});
    else
      res.status(400).send({error: err.message});
  }
})

taskRouter.post('/', async (req, res) => {
  try {
    taskModel = new TaskModel();
    const result = await taskModel.createTask(req.body);
    res.status(201).send({created: `/task/${result}`});
  }catch(err){
    res.status(400).send({error: err.message});
  }
})

taskRouter.put('/:id', async (req, res) => {
  try {
    taskModel = new TaskModel();
    const result = await taskModel.modifyTask(req.params.id, req.body);
    res.status(201).send({modified: `/task/${req.params.id}`, info: result});
  }catch(err){
    res.status(400).send({error: err.message});
  }
})

module.exports = { taskRouter };

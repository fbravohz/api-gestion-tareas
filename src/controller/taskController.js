const express = require('express');
const TaskModel = require('../model/TaskModel');
const { createConnection, closeConnection } = require('../database');

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
  try {
    taskModel = new TaskModel();
    const result = await taskModel.getAllTasks();
    if(result.length === 0)
      throw new Error('Tasks not found');
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
    res.status(400).send({error: err.message});
  }
})

module.exports = { taskRouter };

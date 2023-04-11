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
  console.log(": ",req.body);
  // try {
  //   taskModel = new TaskModel();
  //   const result = await taskModel.createTask(req.body);
  //   console.log("CREATED TASK: ", result);
  //   // if(result.length === 0)
  //   //   throw new Error('Error creating task');
  //   res.status(201).send({created: `/task/`});
  // }catch(err){
  //   res.status(400).send({error: err.message});
  // }
})

module.exports = { taskRouter };

const express = require('express');
const UserModel = require('../model/userModel');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    taskModel = new UserModel();
    const result = await taskModel.getAllUsers();
    if(result.length === 0)
      throw new Error('Error getting all users');
    else
    res.status(200).send(result);
  }catch(err){
    res.status(400).send({error: err.message});
  }
})

userRouter.get('/:id', async (req, res) => {
  try {
    taskModel = new UserModel();
    const result = await taskModel.getUserById(req.params.id);
    if(result.length === 0)
      throw new Error('User not found');
    res.status(200).send(result);
  }catch(err){
    if(err.message === 'User not found')
      res.status(404).send({error: err.message});
    else
      res.status(400).send({error: err.message});
  }
})


module.exports = { userRouter };
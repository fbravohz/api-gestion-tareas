// Import the Express framework and the TaskModel class
const express = require('express');
const TaskModel = require('../model/TaskModel');

// Create a new instance of the Express Router class to define the taskRouter object
const taskRouter = express.Router();

/**
 * Define a new route handler for retrieving all tasks using HTTP GET method
 * @param req - the request object
 * @param res - the response object
 * @return - 200 if succesful and the user's array of objects, 404 if not found
 */
taskRouter.get('/', async (req, res) => {
  try {
    // Create a new instance of the TaskModel class
    const taskModel = new TaskModel();
    // Call the getAllTasks method on the taskModel instance
    const result = await taskModel.getAllTasks();
    // If no tasks were found, throw an error
    if (result.length === 0) {
      throw new Error('No tasks found');
    } else {
      // If successful, send a 200 status code. Using the spread operator
      // into an array in order to organize the results, giving back the
      // authenticated user and the requested data.
      res.status(200).send({auth: res.locals.auth, data: [...result]});
    }
  } catch (err) {
    // If an error occurs, send a 400 status code and the error message
    res.status(404).send({error: err.message});
  }
})

/**
 * Define a new route handler for retrieving a task by ID using HTTP GET method
 * @param req - the request object
 * @param res - the response object
 * @return - 200 if succesful and the user's object, 404 if not found, 400 if a bad request
 */
taskRouter.get('/:id', async (req, res) => {
  try {
    // Create a new instance of the TaskModel class
    const taskModel = new TaskModel();
    // Call the getTaskById method on the taskModel instance with the task ID as an argument
    const result = await taskModel.getTaskById(req.params.id);
    // If no task was found, throw an error
    if (result.length === 0) {
      throw new Error('Task not found');
    }
    // If successful, send a 200 status code. Using the spread operator
    // into an array in order to organize the results, giving back the
    // authenticated user and the requested data.
    res.status(200).send({auth: res.locals.auth, data: [...result]});
  } catch (err) {
    // If the error message is 'Task not found', send a 404 status code
    if (err.message === 'Task not found') {
      res.status(404).send({error: err.message});
    } else {
      // Otherwise, send a 400 status code and the error message
      res.status(400).send({error: err.message});
    }
  }
})

/**
 * Define a new route handler for creating a task using HTTP POST method
 * @param req - the request object
 * @param res - the response object
 * @return - 201 if created, 400 if a bad request
 */
taskRouter.post('/', async (req, res) => {
  try {
    // Create a new instance of the TaskModel class
    const taskModel = new TaskModel();
    // Call the createTask method on the taskModel instance with the request body as an argument
    const result = await taskModel.createTask(req.body);
    // If successful, send a 201 status code and the URL of the newly created task.
    // Using the spread operator into an object in order to organize the results, giving
    // back the authenticated user and the requested data.
    res.status(201).send({auth: res.locals.auth, data: {created: `/task/${result}`}});
  } catch (err) {
    // If an error occurs, send a 400 status code and the error message
    res.status(400).send({error: err.message});
  }
})

/**
 * Define a new route handler for modifying a task using HTTP PUT method
 * @param req - the request object
 * @param res - the response object
 * @return - 200 if successful, 400 if a bad request
 */
taskRouter.put('/:id', async (req, res) => {
  try {
    // Create a new instance of the TaskModel class
    const taskModel = new TaskModel();
    // Call the modifyTask method on the taskModel instance with the task ID and request body as arguments
    const result = await taskModel.modifyTask(req.params.id, req.body);
    // If no rows were affected, send a 400 status code; otherwise, send a 200 status code
    result === 0 ? res.status(400) : res.status(200);
    // Using the spread operator into an object in order to organize the results, giving
    // back the authenticated user and the requested data.
    // Send a response with the URL of the modified task and the number of affected rows
    res.send({auth: res.locals.auth, data: {issued: `/task/${req.params.id}`, affectedRows: result}});
  } catch (err) {
    // If an error occurs, send a 400 status code and the error message
    res.status(400).send({error: err.message});
  }
})

/**
 * Define a new route handler for deleting a task using HTTP DELETE method
 * @param req - the request object
 * @param res - the response object
 * @return - 200 if successful, 404 if not found
 */
taskRouter.delete('/:id', async (req, res) => {
  try {
    // Create a new instance of the TaskModel class
    const taskModel = new TaskModel();
    // Call the deleteTaskById method on the taskModel instance with the task ID as an argument
    const result = await taskModel.deleteTaskById(req.params.id);
    // If no rows were affected, throw an error indicating that the task was not found
    if (result === 0) {
      throw new Error('Task not found');
    }
    // Using the spread operator into an object in order to organize the results, giving
    // back the authenticated user and the requested data.
    // Send a response 200 OK with the deleted task and the number of affected rows
    res.status(200);
    res.send({auth: res.locals.auth, data: {deleted: `/task/${req.params.id}`, affectedRows: result}})
  } catch (err) {
    // If an error occurs, send a 404 status code
    res.status(404);
    res.send({error: err.message});
  }
})

// Export the taskRouter object for use in other parts of the application
module.exports = { taskRouter };

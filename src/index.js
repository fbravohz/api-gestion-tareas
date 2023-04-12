/* These lines of code are importing necessary modules and middleware for the application. */
const express = require('express');
const { taskRouter } = require('./controller/taskController');
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');
require('dotenv').config();

// creating our application
const app = express();

/*allows the application to parse JSON data sent in an HTTP
request and convert it to a JavaScript object that can be used.*/
app.use(express.json())

/*Mounting the apiKeyMiddleware that will authenticate a user with the
  given apiKey sent through the headers.*/
app.use(apiKeyMiddleware)

// GET endpoint that returns a simple JSON object
app.get('/', async (req, res) => {
  res.send('Please go to /tasks endpoint');
})

// Mounts the taskRouter into the middleware for /task endpoint
app.use('/task', taskRouter);

// Starts the server and listens on port 3000
app.listen(3000,() => {
  console.log('Listening in port 3000');
});
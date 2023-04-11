const express = require('express');
const { userRouter } = require('./controller/userController');
const { taskRouter } = require('./controller/taskController');
require('dotenv').config();

const app = express();

app.get('/', async (req, res) => {
  res.send({saludo: 'Hello world'});
})

app.use('/user', userRouter);
app.use('/task', taskRouter)

app.listen(3000,() => {
  console.log('Listening in port 3000');
});


const express = require('express');
const { userRouter } = require('./controller/userController');
const { taskRouter } = require('./controller/taskController');
require('dotenv').config();

const app = express();

/*allows the application to parse JSON data sent in an HTTP
request and convert it to a JavaScript object that can be used.*/
app.use(express.json())

app.get('/', async (req, res) => {
  res.send({saludo: 'Hello world'});
})

app.post('/', async (req, res) => {
  console.log(req.body);
  res.send('data received');
})

app.use('/user', userRouter);

app.use('/task', taskRouter);

app.listen(3000,() => {
  console.log('Listening in port 3000');
});

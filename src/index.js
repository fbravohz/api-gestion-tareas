const express = require('express');
const { userRouter } = require('./controller/userController');
require('dotenv').config();
const app = express();



app.get('/', function (req, res){
  res.send({saludo: 'Hello world'});
})

// app.get('/users', function(req, res, next){
//   res.send("hola");
// })



app.use('/user', userRouter);

// app.use('/task', taskRouter)


app.listen(3000, function(){

  console.log('Listening in port 3000!');
});


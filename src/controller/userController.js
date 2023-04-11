const express = require('express');
const { createConnection, closeConnection } = require('../database');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const connection = await createConnection();
  const result = await connection.execute('SELECT * FROM task');
  console.log(result);
  closeConnection(connection);
  res.send(result[0]);
})

userRouter.get('/:id', (req, res) => {
  res.send(`pagina para usuario ${req.params.id}`);
})

module.exports = { userRouter };
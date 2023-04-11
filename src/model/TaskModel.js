const { createConnection, closeConnection } = require('../database');

class TaskModel {
  constructor(){
  }

  async getAllTasks(){
    const connection = await createConnection();
    const [result] = await connection.execute('SELECT id_task, title, description, status FROM task');
    closeConnection(connection);
    return result;
  }

  async getTaskById(id){
    const connection = await createConnection();
    const query = `
      SELECT id_task, title, description, status, comment, username as responsible, tags
      FROM task
      INNER JOIN user
      ON task.id_task = ${id}
      AND task.id_responsible = user.id_user;`
    const [result] = await connection.execute(query);
    closeConnection(connection);
    return result;
  }

  async createTask(body){
    const connection = await createConnection();
    const query = `
    INSERT INTO task (title, description, status)
    VALUES (${body.title}, ${body.description}, ${body.status})`;
    const [result] = await connection.execute(query);
    console.log(result?.insertId);
    closeConnection(connection);
    return result;
  }
}

module.exports = TaskModel;
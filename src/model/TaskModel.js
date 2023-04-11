const { createConnection, closeConnection } = require('../database');

class TaskModel {
  constructor(){
  }

  async getAllTasks(){
    const connection = await createConnection();
    const [result] = await connection.execute('SELECT id_task, title, description, status FROM task');
    console.log(result);
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
    console.log(result);
    closeConnection(connection);
    return result;
  }
}

module.exports = TaskModel;
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
      SELECT *
      FROM task
      WHERE id_task = ${id}`
    const [result] = await connection.execute(query);
    closeConnection(connection);
    return result;
  }

  async createTask(body){
    const connection = await createConnection();
    const query = `
    INSERT INTO task (title, description, status, comment, responsible, tags)
    VALUES ('${body.title}', '${body.description}', '${body.status}', '${body.comment}', '${body.responsible}', '${body.tags}')`;
    const [result] = await connection.execute(query);
    closeConnection(connection);
    return result.insertId;
  }

  async modifyTask(id, body){
    const keys = Object.keys(body);
    let set = '';
    keys.forEach((value) => {
      set += `${value} = '${body[value]}',`;
    })
    set = set.substring(0,set.length-1);
    const connection = await createConnection();
    const query = `UPDATE task SET ${set} WHERE id_task = ${id}`;
    const [result] = await connection.execute(query);
    closeConnection(connection);
    return result.info;
  }
}

module.exports = TaskModel;

// , '${body.status}', '${body.comment}', '${body.responsible}', '${body.tags}
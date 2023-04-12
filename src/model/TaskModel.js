const { createConnection, closeConnection } = require('../database');

/* The TaskModel class contains methods for interacting with a database to perform CRUD operations on
tasks. */
class TaskModel {
  constructor(){
  }

/**
 * Function to obtain all tasks from the database
 * @returns the array of objects of the tasks
 */
async getAllTasks(){
  const connection = await createConnection();
  try{
    const query = `SELECT id_task, title, description, status FROM task`;
    // Execute the query and destructure the result in order to access the group of tasks
    const [result] = await connection.execute(query);
    return result;
  }catch(e){
    // If there is an error, throw it
    throw e;
  }finally{
    // Close the connection
    closeConnection(connection);
  }
}

/**
 * Function to obtain a task from the database by its ID
 * @param id - the row id to be obtained
 * @returns the object of the task
 */
async getTaskById(id){
  const connection = await createConnection();
  try{
    const query = `SELECT * FROM task WHERE id_task = ${id}`
    // Execute the query and destructure the result in order to access the task's row.
    const [result] = await connection.execute(query);
    return result;
  }catch(e){
    // If there is an error, throw it
    throw e;
  }finally{
    // Close the connection
    closeConnection(connection);
  }
}

/**
 * Function to create a new task in the database
 * @returns the id of the new task
 */
  async createTask(body){
    const connection = await createConnection();
    // Using this logic we don't have to worry about
    // getting the properties in the wrong order.
    // and we can scale it for more columns in future.
    let columns = '';
    let values = '';
    Object.keys(body).forEach((value) => {
      columns += `${value},`;
      values += `'${body[value]}',`
    })
    columns = columns.substring(0,columns.length-1);
    values = values.substring(0,values.length-1);
    try{
    // The query to insert values into a new row
    const query = `INSERT INTO task (${columns}) VALUES (${values})`;
    // Destructuring the result in order to access the new id.
    const [result] = await connection.execute(query);
    return result.insertId;
    }catch(e){
      // If there is an error, throw it
      throw e;
    }finally{
      // Close the database connection
      closeConnection(connection);
    }
  }

/**
 * Function to modify an existing task in the database
 * @param id - the row id to be modified
 * @returns the number of affected rows
 */
  async modifyTask(id, body){
    const connection = await createConnection();
    // Using this logic we don't have to worry about
    // getting the properties in the wrong order.
    // and we can scale it for more columns in future.
    let set = '';
    Object.keys(body).forEach((value) => {
      set += `${value} = '${body[value]}',`;
    })
    set = set.substring(0,set.length-1);
    try{
      // The query to update the properties into selected id.
      const query = `UPDATE task SET ${set} WHERE id_task = ${id}`;
      // Destructuring the result in order to access the info property.
      const [result] = await connection.execute(query);
      return result.affectedRows;
    }catch(e){
      // If there is an error, throw it
      throw e;
    }finally{
      // Close the database connection
      closeConnection(connection);
    }
  }

/**
 * Function to delete a row from the database
 * @param id - the row id to be deleted
 * @returns the number of affected rows
 */
  async deleteTaskById(id){
    const connection = await createConnection();
    try{
      // The query to delete the selected task
      const query = `DELETE FROM task WHERE id_task = ${id}`
      // Destructuring the result in order to access the task's row.
      const [result] = await connection.execute(query);
      return result.affectedRows;
    }catch(e){
      // If there is an error, throw it
      throw e;
    }finally{
      // Close the database connection
      closeConnection(connection);
    }
  }
}

module.exports = TaskModel;
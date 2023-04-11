const { createConnection, closeConnection } = require('../database');

class UserModel {
  constructor(){
  }

  async getAllUsers(){
    const connection = await createConnection();
    const [result] = await connection.execute('SELECT id_user, username FROM user');
    closeConnection(connection);
    return result;
  }

  async getUserById(id){
    const connection = await createConnection();
    const query = `
      SELECT *
      FROM user
      WHERE user.id_user = ${id}`
    const [result] = await connection.execute(query);
    closeConnection(connection);
    return result;
  }
}

module.exports = UserModel;
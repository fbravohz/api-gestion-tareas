/*These functions are used establish and close a connection to a database. */
const { createConnection, closeConnection } = require('../database');

/* The `UserModel` class has a method that retrieves a user from a database based on their API key. */
class UserModel {
  constructor(){
  }

/**
 * This function retrieves a user from a database based on their API key.
 * @param apiKey - the api key provided by the user
 * @returns the object of the user to wich belongs the apiKey
 */
  async getUserByApiKey(apiKey){
    const connection = await createConnection();
    const query = `SELECT * FROM user WHERE user.apiKey = '${apiKey}'`
    const [[result]] = await connection.execute(query);
    closeConnection(connection);
    return result;
  }
}

/*When another file requires this module, it will receive the `UserModel` class as the default
export. */
module.exports = UserModel;
const mysql = require('mysql2/promise');

/**
 * Creates a connection to the MySQL database using the parameters defined
 * in the environment variables.
 * @return - the connection to the database or throws an error.
 */
const createConnection = async () => {
  try{
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
    })
    return connection;
  }catch(e){
    // If there is an error, log it to the console and throw the error
    console.log('Error getting connection', e);
    throw e;
  }
}

/**
 * Closes a MySQL database connection.
 * @params connection - The connection to be closed
 */
const closeConnection = async (connection) => {
  try{
    await connection.end();
  }catch(e){
    // If there is an error, log it to the console and re-throw the error
    console.log('Error closing connection', e);
    throw e;
  }
}

// Exports the createConnection and closeConnection functions
module.exports = { createConnection, closeConnection };
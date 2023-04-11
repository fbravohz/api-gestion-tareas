const mysql = require('mysql2/promise');
require('dotenv').config();

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
    console.log('Error getting connection', e);
    throw e;
  }
}

const closeConnection = async (connection) => {
  try{
    await connection.end();
    console.log('Connection closed');
  }catch(e){
    console.log('Error closing connection', e);
    throw e;
  }
}

module.exports = { createConnection, closeConnection };

// async function main(){
//   const connection = await createConnection();
//   const result = await connection.execute('SELECT * FROM task');
//   console.log(result);
//   closeConnection(connection);
// }

// main();

const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,         
  user: process.env.DB_USER,         
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,     
  waitForConnections: true,
  connectionLimit: 10,               // Max connections
  queueLimit: 0,
  //ssl: { rejectUnauthorized: true } // added ssl for Azure                    // No que limits
});

// Export pool with promise API
const promisePool = pool.promise();

module.exports = promisePool;

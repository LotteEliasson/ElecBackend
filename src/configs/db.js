const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: prtocess.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if(err) {
    console.error("Error connecting to database: ", err.message);
    process.exit(1) //end program due to connection error.
  }
  console.log("Connected to database")
})

module.exports = db;
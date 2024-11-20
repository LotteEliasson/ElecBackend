const db = require('../configs/db');

const fetchAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const [results] = await db.promise().query(query);
  return results;
};
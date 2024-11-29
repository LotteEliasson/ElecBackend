const db = require('../configs/db');

const fetchAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const [results] = await db.promise().query(query);
  return results;
};

const findUserByEmailAndPassword = async (email, password) => {
  const query = 'SELECT * FROM auth WHERE email=? AND password=?';
  // method db.promise().query sents a query to the db and returns a result 
  // which is an array of results from db, though email is unique.
  // the result is an array containing the user matching the query.
  const [result] = await db.promise().query(query, [email, password]);

  console.log(' userModel Auth Table: ', result);

  //If the rows contain minimum one, then return the first otherwise return null.
  return result.length ? result[0] : null;
};

const getUserDetails = async (user_id) => {
  const query = 'SELECT user_id, username, email, userrole FROM users WHERE user_id = ?'
  const [results] = await db.promise().query(query, [user_id]);

  console.log('userModel Users Table:', results);
  
  return results.length ? results[0] : null;
}

module.exports = {
  fetchAllUsers,
  findUserByEmailAndPassword,
  getUserDetails,
}
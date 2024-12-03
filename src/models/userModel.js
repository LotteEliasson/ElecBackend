const db = require('../configs/db');
const bcrypt = require('bcrypt');

const fetchAllUsers = async () => {
  const query = 'SELECT user_id, username, email, userrole, company FROM users';
  const [results] = await db.query(query);
  return results;
};

const findUserByEmailAndPassword = async (email, password) => {
  const query = 'SELECT * FROM auth WHERE email=?';
  // method db.query sents a query to the db and returns a result 
  // which is an array of results from db, though email is unique.
  // the result is an array containing the user matching the query.
  const [result] = await db.query(query, [email]);

  console.log(' userModel Auth Table: ', result);
  if(result.length === 0) return null;

  const user = result[0];
  const match = await bcrypt.compare(password, user.password);

  if(match) {
    return user;
  } else {
    return null;
  }
};

const getUserDetails = async (user_id) => {
  const query = 'SELECT user_id, username, email, userrole, company FROM users WHERE user_id = ?'
  const [results] = await db.query(query, [user_id]);

  console.log('userModel Users Table:', results);
  
  return results.length ? results[0] : null;
}

const updateUser = async (userId, userData) => {
  const { username, email, userrole, company } = userData;
  const query = 'UPDATE users SET username = ?, email = ?, userrole = ?, company = ? WHERE user_id = ?';
  const [result] = await db.query(query, [username, email, userrole,company, userId]);

  if (result.affectedRows === 0) {
    return null; // No users found with that ID
  }

  // Get the updated user
  const [updatedUser] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
  return updatedUser[0];
}

const deleteUser = async (userId) => {
  const query = 'DELETE FROM users WHERE user_id = ?';
  const [result] = await db.query(query, [userId])

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}
//Check if user already exists by email (unique)
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [results] = await db.query(query, [email]);
  return results.length ? results[0] : null;
};



const createUser = async (userData) => {
  const {username, email, password, company, userrole} = userData
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    //Insert into users
    const userQuery = 'INSERT INTO users (username, email, userrole, company) VALUES (?, ?, ?, ?)';
    const [userResult] = await connection.query(userQuery,[username, email, userrole, company]);

    const userId = userResult.insertId;
    console.log(`Inserted user with user_id: ${userId}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    //Insert into auth
    const authQuery = 'INSERT INTO auth (username, email, password, user_id) VALUES (?, ?, ?, ?)';
    const [authResult] = await connection.query(authQuery, [username, email, hashedPassword, userId])

    console.log(`Inserted auth with user_id: ${userId}`);

    //Commit to db
    await connection.commit();

    //Returns new user without password
    const [newUser] = await connection.query('SELECT user_id, username, email, userrole, company FROM users WHERE user_id = ?', [userId]);
    return newUser[0];
  } catch (error) {
       // Rollback transaction if error
       await connection.rollback();
       throw error;
  } finally {
    // Relaese connection
    connection.release();
  }

}


module.exports = {
  fetchAllUsers,
  findUserByEmailAndPassword,
  getUserDetails,
  updateUser,
  deleteUser,
  getUserByEmail,
  createUser,
}
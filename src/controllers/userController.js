// userController handle res from userModel(db) from the HTTP-req in userRoutes

const userModel = require('../models/userModel');

// res returnerer svar som json of users in DB
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.fetchAllUsers();
    res.json(users)
  } catch (error) {
    console.error('Error fetching users: ', error);
    res.json(500).json({ error: 'Database query error'});
  }
}
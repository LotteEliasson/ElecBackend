// userController handle res from userModel(db) from the HTTP-req in userRoutes

const userModel = require('../models/userModel');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

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


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ error: 'Email and Password is required'});
  }

  try {
    const user = await userModel.findUserByEmailAndPassword(email, password);

    console.log('userController User from Auth Table:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

    console.log('UserController user_id from auth table:', user.user_id);

    // Fetch user data from `users` table
    const userDetails = await userModel.getUserDetails(user.user_id);
    if (!userDetails) {
        return res.status(404).json({ message: 'User not found in users table' });
    }
  
  console.log('Full User Data:', userDetails);

    // Successful login
    //JWT token!!
    const token = authService.generateToken(userDetails);
    console.log('Generated Token:', token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
    
  } catch (error) {
    console.error('Error during login: ', error);
    res.status(500).json({error: 'Database query error'});
  }
};

const getUserDetails = async (req, res) => {
  // Extract the user ID from the authendicated user
  const user_id = req.user.user_id;
  
  try {
   const details = await userModel.getUserDetails(user_id);
   if (!details) {
     return res.status(404).json({ error: 'User not found' });
   }
   res.json(details);
   
  } catch (error) {
   console.error('Error fetching user details:', error);
   res.status(500).json({ error: 'Database query error' });
 }
}

// src/controllers/userController.js


const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, userrole, company } = req.body;

  if (!username || !email || !userrole || !company) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedUser = await userModel.updateUser(userId, { username, email, userrole, company });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await userModel.deleteUser(userId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, company, userrole } = req.body;

    if (!username || !email || !password || !company || !userrole) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Chech if user already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this mail already exists.' });
    }

    // Create user in auth and users table
    const newUser = await userModel.createUser({ username, email, password, company, userrole });

    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(500).json({ message: 'Failed to create user.' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


module.exports = {
  getAllUsers,
  loginUser,
  getUserDetails,
  updateUser,
  deleteUser,
  createUser,
}
// userController handle res from userModel(db) from the HTTP-req in userRoutes

const userModel = require('../models/userModel');
const authService = require('../services/authService');

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

module.exports = {
  getAllUsers,
  loginUser,
  getUserDetails,
}
const express = require ('express');

const { getAllUsers, loginUser, getUserDetails, updateUser, deleteUser, createUser} = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken')

//Define routes for specific HTTP-request base on the URL from the frontend
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/login', loginUser);
router.post('/users', createUser);
router.get('/users/me', authenticateToken, getUserDetails);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);


module.exports = router;


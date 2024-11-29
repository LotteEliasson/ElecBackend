const express = require ('express');

const { getAllUsers, loginUser, getUserDetails } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken')

//Define routes for specific HTTP-request base on the URL from the frontend
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/login', loginUser);
router.get('/users/me', authenticateToken, getUserDetails);


module.exports = router;


const express = require ('express');

const { getAllUsers } = require('../controllers/userController');

//Define routes for specific HTTP-request base on the URL from the frontend
const router = express.Router();

router.get('/users', getAllUsers);

module.exports = router;


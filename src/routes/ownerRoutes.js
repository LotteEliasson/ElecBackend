const express = require('express');

const { getAllOwners, createOwner, updateOwner, deleteOwner} = require('../controllers/ownerController')
const authenticateToken = require('../middlewares/authenticateToken')

//Define routes for specific HTTP-request base on the URL from the frontend
const router = express.Router();

router.get('/owners', getAllOwners);
router.post('/owners', createOwner);
router.put('/owners/:id', updateOwner);
router.delete('/owners/:id', deleteOwner);

module.exports = router;
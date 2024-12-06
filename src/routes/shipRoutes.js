const express = require('express');

const { getAllShips, createShip, updateShip, deleteShip } = require('../controllers/shipController')
const authenticateToken = require('../middlewares/authenticateToken')

//Define routes for specific HTTP-request base on the URL from the frontend
const router = express.Router();

router.get('/ships', getAllShips);
router.post('/ships', createShip);
router.put('/ships/:id', updateShip);
router.delete('/ships/:id', deleteShip);

module.exports = router;
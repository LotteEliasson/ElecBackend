const express = require('express');

const { getAllJunctionBoxes, createJunctionBox, updateJunctionBox, deleteJunctionBox, getJuncionBoxByID } = require('../controllers/junctionBoxController');
const authenticateToken = require('../middlewares/authenticateToken');

// Define routes for specific HTTP-requests based on the URL from the frontend
const router = express.Router();

router.get('/junction-boxes', getAllJunctionBoxes);
router.post('/junction-boxes', createJunctionBox);
router.put('/junction-boxes/:id', updateJunctionBox);
router.delete('/junction-boxes/:id', deleteJunctionBox);
router.get('/junction-boxes/:id', getJuncionBoxByID)

module.exports = router;

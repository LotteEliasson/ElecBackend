const express = require('express');
const router = express.Router();
const { 
  getAllComponents, 
  createComponent, 
  updateComponent, 
  deleteComponent 
} = require('../controllers/componentController');

router.get('/components', getAllComponents); // Fetch all components
router.post('/components', createComponent); // Create a new component
router.put('/components/:id', updateComponent); // Update an existing component
router.delete('/components/:id', deleteComponent); // Delete a component

module.exports = router;

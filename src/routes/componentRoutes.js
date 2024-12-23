const express = require('express');
const router = express.Router();
const { 
  getAllComponents, 
  createComponent, 
  updateComponent, 
  deleteComponent,
  getComponentById,
  getComponentsByJunctionBoxId
} = require('../controllers/componentController');

router.get('/components', getAllComponents);
router.post('/components', createComponent); 
router.put('/components/:id', updateComponent); 
router.delete('/components/:id', deleteComponent);
router.get('/components/:id', getComponentById); 
router.get('/components/jb/:id', getComponentsByJunctionBoxId )
module.exports = router;

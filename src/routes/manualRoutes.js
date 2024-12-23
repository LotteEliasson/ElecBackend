const express = require('express');
const {
  getAllManuals,
  createManual,
  updateManual,
  deleteManual,
  getManualById,
  downloadManualFile,
  downloadManualFileJunctionBox,
  getManualIdByComponentId
} = require('../controllers/manualController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/multer-config'); //Handle filuploads

// Define routes for manual-related HTTP requests
const router = express.Router();

router.get('/manuals', getAllManuals);
router.get('/manuals/:id', getManualById); 
router.post('/manuals', upload.single('file'), createManual); 
router.put('/manuals/:id', upload.single('file'), updateManual);
router.delete('/manuals/:id', authenticateToken, deleteManual); 
router.get('/manuals/:id/file', downloadManualFile); // Download a file by manual ID
router.get('/manuals/jb/:id/file', downloadManualFileJunctionBox); // Download a file by junction box ID
router.get('/manuals/comp/:id', getManualIdByComponentId);


module.exports = router;

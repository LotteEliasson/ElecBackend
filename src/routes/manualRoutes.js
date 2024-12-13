const express = require('express');
const {
  getAllManuals,
  createManual,
  updateManual,
  deleteManual,
  getManualById,
  downloadManualFile
} = require('../controllers/manualController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/multer-config'); // Til håndtering af filuploads

// Define routes for manual-related HTTP requests
const router = express.Router();

router.get('/manuals', getAllManuals); // Fetch all manuals
router.get('/manuals/:id', getManualById); // Fetch a single manual by ID
router.post('/manuals', upload.single('file'), createManual); // Create a new manual
router.put('/manuals/:id', upload.single('file'), updateManual); // Update a manual
router.delete('/manuals/:id', authenticateToken, deleteManual); // Delete a manual

router.get('/manuals/:id/file', downloadManualFile); // Download a file by manual ID


module.exports = router;

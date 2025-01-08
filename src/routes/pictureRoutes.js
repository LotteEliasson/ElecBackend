const express = require('express');
const { fetchAllPictures, fetchPicturesByUserId } = require('../controllers/pictureController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/multer-config'); //Handle filuploads


const router = express.Router();

router.get('/pictures', fetchAllPictures);
router.get('/pictures/user/:id', fetchPicturesByUserId);

module.exports = router;
const express = require('express');

const { sendEmail } = require('../controllers/orderController');

//Define routes for specific HTTP-request base on the URL from the frontend
const router = express.Router();

router.post('/send-email', sendEmail);

module.exports = router;
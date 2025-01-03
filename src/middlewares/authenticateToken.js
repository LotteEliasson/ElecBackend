// src/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Token defined userController-userLogin as userDetails
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Access Denied: Invalid Token Format' });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user || decoded; // Hvis decoded har 'user', brug det. Ellers brug hele decoded
        next();
    } catch (error) {
        console.error('Invalid Token:', error);
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;

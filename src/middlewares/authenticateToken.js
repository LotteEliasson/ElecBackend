const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Invalid Token:', error);
        res.status(401).json({ error: 'Invalid Token' });
    }
};

module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
require('dotenv').config();


//generateToken gemmer detaljer om brugeren.
const generateToken = (user) => {
    const payload = {
        user_id: user.user_id,
        email: user.email,
        role: user.userrole,
        company: user.company,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };

// utils/generateToken.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;


 //Generates a JWT token for a user.
 
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
};

// //verify token
// const verifyToken = (token) => {
//     return jwt.verify(token, secret);
// };
module.exports = {generateToken};

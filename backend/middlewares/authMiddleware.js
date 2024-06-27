const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;


const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Extracted Token:", token);
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log("Decoded Token:", decoded);
      req.user = decoded;
      next();
    } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;

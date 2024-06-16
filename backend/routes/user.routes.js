const express =require("express");
const router = express.Router();
const {signup,login,getProfile} = require ("../controllers.js/authController")
const authenticate = require("../middlewares/authMiddleware")

// Public routes
router.post("/signup",signup);
router.post("/login",login);


// Protected route - Get User Profile
router.get('/profile', authenticate, getProfile);
   

module.exports = router;
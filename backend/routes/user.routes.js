const express =require("express");
const router = express.Router();
const {signup,login,getProfile} = require ("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");
const { requestPasswordReset, resetPassword } = require('../controllers/resetpassword');
const {addWorker} =require("../controllers/workerController");

// Public routes
router.post("/signup",signup);
router.post("/login",login);


// Protected route - Get User Profile
router.get('/profile', authenticate, getProfile);
   

// Route to request password reset
router.post('/request-reset-password', requestPasswordReset);

// Route to handle actual password reset
router.post('/reset-password/:token', resetPassword);

// route to addworker
router.post('/add-worker',authenticate,addWorker);

module.exports = router;
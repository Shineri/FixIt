const express = require('express');
const router = express.Router();
const { createComplaint} = require('../controllers/complaintController');
const authenticate = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware to protect routes
const {findAllComplaintsByUser}=require('../controllers/userController');

// Route to create a new complaint
router.post('/create-complaint',authenticate,createComplaint);

//get all complaint
router.get('/get-my-complaint',authenticate,findAllComplaintsByUser);


module.exports = router;
const express = require('express');
const router = express.Router();
const { createComplaint,resolveComplaint} = require('../controllers/complaintController');
const authenticate = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware to protect routes
const {findAllComplaintsByUser}=require('../controllers/userController');

// Route to create a new complaint
router.post('/create-complaint',authenticate,createComplaint);

//get all complaint
router.get('/get-my-complaint',authenticate,findAllComplaintsByUser);

//payment route
router.post('/resolve-complaint', authenticate, resolveComplaint);
router.post('/process-payment', authenticate, processPayment);
module.exports = router;
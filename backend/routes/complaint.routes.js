const express = require('express');
const router = express.Router();
const { createComplaint} = require('../controllers/complaintController');
const authenticate = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware to protect routes

// Route to create a new complaint
router.post('/create', authenticate, createComplaint);


module.exports = router;

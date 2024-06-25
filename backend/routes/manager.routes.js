const express = require('express');
const router = express.Router();
const { getAllComplaints, getWorkersByService, assignWorker, addManagerPaymentDetails } = require('../controllers/managerController');
const authenticate = require('../middlewares/authMiddleware');
const {addWorker} =require("../controllers/workerController");
const checkPaymentDetails = require('../middlewares/checkPaymentDetails');
// Get all complaints under manager
router.get('/complaints', authenticate,checkPaymentDetails, getAllComplaints);

// Get workers by service
router.get('/workers', authenticate, getWorkersByService);

// Assign worker to a complaint
router.post('/assign-worker', authenticate,checkPaymentDetails, assignWorker);

// Add payment details
//router.post('/add-payment-details', authenticate, checkPaymentDetails,addManagerPaymentDetails);

// route to addworker
router.post('/add-worker',authenticate,checkPaymentDetails,addWorker);

module.exports = router;

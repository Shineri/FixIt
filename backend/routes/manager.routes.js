const express = require('express');
const router = express.Router();
const { getAllComplaints, getWorkersByService, assignWorker, addPaymentDetails } = require('../controllers/managerController');
const authenticate = require('../middlewares/authMiddleware');
const {addWorker,getAllWorker,deleteWorker} =require("../controllers/workerController");
const checkPaymentDetails = require('../middlewares/checkPaymentDetails');
// Get all complaints under manager
router.get('/complaints', authenticate,checkPaymentDetails, getAllComplaints);

// Get workers by service
router.get('/workers/:complaintId', authenticate, getWorkersByService);

// Assign worker to a complaint
router.post('/assign-worker', authenticate,checkPaymentDetails, assignWorker);

// Add payment details
router.post('/add-payment-details', authenticate,addPaymentDetails);

// route to addworker
router.post('/add-worker',authenticate,checkPaymentDetails,addWorker);

//router to get all worker under respective manager
router.get('/get-all-worker',authenticate,checkPaymentDetails,getAllWorker);

//router to delete worker
router.delete('/delete-worker/:workerId',authenticate,checkPaymentDetails,deleteWorker);



module.exports = router;

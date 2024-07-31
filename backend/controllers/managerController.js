const Complaint = require("../models/complaint");
const Worker = require("../models/worker");
const PaymentDetails = require('../models/paymentDetails');
const User = require("../models/user");


//======================================All complaint controller===================================================
const getAllComplaints = async (req,res)=>{
    try{
        const userId = req.user.id;
       const complaints = await Complaint.find({manager:userId});
       if(!complaints.length){
        console.log("No complaint found");
       return res
        .status(200)
        .json({message:"No complaint found"});
       }
       console.log("complaints under manager:",complaints);

       return res
       .status(200)
       .json(complaints);
    }catch (error) {
        console.error("Error in getting all complaints:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get workers based on the service required
const getWorkersByService = async (req, res) => {
    const { complaintId } = req.params;
   console.log("complaintId:",complaintId);
    try {
        const complaint = await Complaint.findOne({_id:complaintId});
 
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        
        const requiredService =  complaint.serviceRequired;
         console.log("Service required :",requiredService);
         
        // Find workers with required service and status "Not Assigned"
        const workers = await Worker.find({
            services: { $elemMatch: { $eq: requiredService } },
            status: "Not Assigned"
        });
          console.log(workers);
        if (!workers.length) {
            console.log(`No workers found for the service: ${requiredService}`);
            return res.status(200).json({ message: "No workers found for the required service" });
        }
          console.log(`All workers has service as ${requiredService} :`, workers);
        return res.status(200).json({Workers: workers});
    } catch (error) {
        console.error("Error in getting workers:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


//AssignWorker after choosing a worker
const assignWorker = async(req,res) => {
    const { complaintId, workerId } = req.body;
    try{
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }
    const worker = await Worker.findById(workerId);

    if (!worker) {
        console.log("No complaint found");
        return res.status(404).json({ message: "Worker not found" });
    }

    complaint.assigned_worker = workerId;
    worker.status="Assigned";
    complaint.status="In Progress";

    await complaint.save();
    await worker.save();
    console.log("Worker assigned asuccesfully :",worker);
    return res.status(200).json({ message: "Worker assigned successfully" });
   
}catch (error) {
    console.error("Error in getting all complaints:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
}
};

// Controller to create new payment details
const addPaymentDetails = async (req, res) => {
    const {
        bankName,
        accountNumber,
        IFSC,
        accountHolderName,
        UPI
    } = req.body;
const manager = req.user.id;
    try {
        // Assuming manager ID is available in req.user.id after authentication
        const newPaymentDetails = await PaymentDetails.create({
            manager: manager,
            bankName,
            accountNumber,
            IFSC,
            accountHolderName,
            UPI
        });

        console.log("Payment details added successfully");
         // Update the manager's paymentDetails field
         await User.findByIdAndUpdate(manager, { paymentDetails: newPaymentDetails._id });

        return res.status(201).json({
            message: 'Payment details added successfully',
            paymentDetails: newPaymentDetails
        });
    } catch (error) {
        console.error('Error creating payment details:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {getAllComplaints,getWorkersByService,assignWorker,addPaymentDetails};




const Complaint = require("../models/complaint");
const Worker = require("../models/worker");

const getAllComplaints = async (req,res)=>{
    try{
        const userId = req.user.id;
       const complaints = await Complaint.findAll({manager:userId});
       if(!complaints.length){
        console.log("No complaint found");
       return res
        .status(200)
        .json({message:"No complaint found"});
       }
       console.log("complaints under manager:",allComplaints);

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
    const { complaintId } = req.query;

    try {
        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        const requiredService = complaint.serviceRequired;

        const workers = await Worker.find({ services: requiredService });

        if (!workers.length) {
            console.log(`No worker has service as ${requiredService}`);
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
    await complaint.save();
    console.log("Worker assigned asuccesfully :",worker);
    return res.status(200).json({ message: "Worker assigned successfully" });
   
}catch (error) {
    console.error("Error in getting all complaints:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
}
};

module.exports = {getAllComplaints,getWorkersByService,assignWorker};




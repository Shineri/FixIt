const Worker = require("../models/worker");
const User = require("../models/user");
const mongoose = require("mongoose");
// Add worker function
const addWorker = async (req, res) => {
  const { fullName, phoneNo, services } = req.body;
  const managerId = req.user.id;

  try {
    // Check if the user is a manager
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== "Manager") {
      return res.status(403).json({ message: "Only managers can add workers" });
    }

    // Check if a worker with the same email already exists
    const existingWorker = await Worker.findOne({fullName,phoneNo });
    if (existingWorker) {
      return res.status(422).json({ message: "Worker with this name and phone Number already exists" });
    }

    // Create a new worker
    const worker = new Worker({
      fullName,
      phoneNo,
      services,
      manager: managerId,
    });

    await worker.save();

    // Add the worker to the manager's list of workers
    manager.workers.push(worker._id);
    await manager.save();

    return res.status(201).json({ message: "Worker added successfully", worker });
  } catch (error) {
    console.error("Error adding worker:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



/*======================================GET ALL WORKER ============================================================*/

const getAllWorker = async (req,res) => {
  const managerId = req.user.id;

  try{
    const allWorkers = await Worker.find({manager:managerId});

    if(!allWorkers.length){
      console.log("No Worker found! Add workers");
     return res
      .status(404)
      .json({message:"No Worker found! Add workers"});
     }
     console.log("All Workers under manager:",allWorkers);

     return res
     .status(200)
     .json({ workers : allWorkers});

  } catch (error) {
    console.error("Error getting worker:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }

};

const deleteWorker = async(req,res) =>{
  const {workerId} = req.params;
  const managerId = req.user.id;
  try{

    // Validate the worker exists
const worker = await Worker.findById(workerId);
if (!worker) {
    return res.status(404).json({ message: "Worker not found" });
}

// Delete the worker
await Worker.deleteOne({ _id: workerId });

await User.updateOne({ _id: managerId },
   { $pull: { 
    workers: workerId}},
    { new: true }
  

);
 
const manager = await User.findById(managerId);
console.log(manager.workers);



console.log("Worker deleted successfully:", worker);
return res.status(200).json({ message: "Worker deleted successfully" });

  }catch (error) {
    console.error("Error deleting worker:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }

};
module.exports = {addWorker,getAllWorker,deleteWorker};
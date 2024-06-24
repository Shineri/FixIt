const Worker = require("../models/worker");
const User = require("../models/user");

// Add worker function
const addWorker = async (req, res) => {
  const { fullName, email, phoneNo, services } = req.body;
  const managerId = req.user.id;

  try {
    // Check if the user is a manager
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== "Manager") {
      return res.status(403).json({ message: "Only managers can add workers" });
    }

    // Check if a worker with the same email already exists
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(422).json({ message: "Worker with this email already exists" });
    }

    // Create a new worker
    const worker = new Worker({
      fullName,
      email,
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

module.exports = {addWorker};

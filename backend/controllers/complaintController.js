const Complaint = require('../models/complaint.js');
const User = require('../models/user.js');

// Create a new complaint
const createComplaint = async (req, res) => {
    const { title, type, description, address, buildingName, societyName, area } = req.body;
    const userId = req.user.id;

    try {
        // Find manager based on address, buildingName, societyName, area
        const manager = await User.findOne({ 
            role: 'Manager',
            address,
            buildingName,
            societyName,
            area
        });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found for the provided location" });
        }

        const complaint = new Complaint({
            user: userId,
            manager: manager._id,
            address,
            buildingName,
            societyName,
            area,
            title,
            type,
            description
        });

        await complaint.save();
        return res.status(201).json({ message: "Complaint created successfully", complaint });
    } catch (error) {
        console.error("Create Complaint error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports={createComplaint};
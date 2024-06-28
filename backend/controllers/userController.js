const Complaint = require('../models/complaint.js'); // Adjust path as per your project structure
const User = require('../models/user.js');
// Controller function to find all complaints under a specific user
const findAllComplaintsByUser = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is retrieved from authentication middleware

    try {
        // Find all complaints where user field matches userId
        const complaints = await Complaint.find({ user: userId });

        if (!complaints.length) {
            return res.status(200).json({ message: "No complaints found for this user" });
        }
        console.log(complaints);
        return res.status(200).json(complaints); // Return the complaints if found
    } catch (error) {
        console.error("Error in finding complaints:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { findAllComplaintsByUser };

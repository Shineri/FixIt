const Complaint = require('../models/complaint.js');
const User = require('../models/user.js');
const mailSender=require('../utils/mailSender.js');

// Create a new complaint
const createComplaint = async (req, res) => {
    const { title, type, description, address, buildingName, societyName, area } = req.body;
    const userId = req.user.id;

    try {
        // Find manager based on address, buildingName, societyName, area
        const manager = await User.findOne({
            role: 'Manager',
            pincode: complaint.pincode,
            state: complaint.state,
            city: complaint.city
        });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found for the provided location" });
        }
        const user=await User.findone({userId});
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
        //manager mailbody
        const emailBody = `
        <h2>New Complaint Register</h2>
        <p>A new complaint in successfully registered.</p>
        <p>You must resolve this.</p>
         `;
        await mailSender(manager.email, 'New Complaint Made', emailBody);
        
        //user mailbody
        const emailbody = `
        <h2>New Complaint registered</h2>
        <p>You register a new complaint.</p>     
        <p>Your complaint has been resolve in few days.</p>
         `;
        await mailSender(user.email, 'New Complaint Registered', emailbody);
        return res.status(201).json({ message: "Complaint created successfully", complaint });
    } catch (error) {
        console.error("Create Complaint error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports={createComplaint};
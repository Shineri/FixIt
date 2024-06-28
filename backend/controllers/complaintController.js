const Complaint = require('../models/complaint.js');
const User = require('../models/user.js');
const mailSender=require('../utils/mailSender.js');

// Create a new complaint
const createComplaint = async (req, res) => {
    const {
      serviceRequired,
      description,
      pincode,
      state,
      city,
      houseNo_buildingName,
      roadName_area_colony,
      availabilitySlot,
    } = req.body;
    const userId = req.user.id;
    //const user=await User.findById({userId});
    
    try {
        // Find the manager based on the address
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({ message: "Invalid user ID" });
        //   }
        const manager = await User.findOne({
          role: "Manager",
          pincode,
          state,
          city,
          roadName_area_colony: { $in: roadName_area_colony }
        });
    
        if (!manager) {
          return res.status(404).json({ message: "Manager not found for the specified area" });
        }
        const managerId=manager._id.toString();
      
  
      // Create the complaint
      const complaint = new Complaint({
        user: userId,
        manager: managerId,
        serviceRequired,
        description,
        pincode,
        state,
        city,
        houseNo_buildingName,
        roadName_area_colony,
        availabilitySlot,
      });
   
      await complaint.save();
      // Get user information for sending email
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
        //manager mailbody
        const manageremail = `
        <h2>New Complaint Register</h2>
        <p>A new complaint in successfully registered.</p>
        <p>You must resolve this.</p>
         `;
        await mailSender(manager.email, 'New Complaint Made', manageremail);
        console.log(manager.email);
        
        //user mailbody
        const useremail = `
        <h2>New Complaint registered</h2>
        <p>You registered a new complaint.</p>     
        <p>Your complaint will be resolve in few days.</p>
         `;
        await mailSender(user.email, 'New Complaint Registered', useremail);
        console.log("created complaint",complaint);
        return res.status(201).json({ message: "Complaint created successfully", complaint });
    } catch (error) {
        console.error("Create Complaint error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports={createComplaint};
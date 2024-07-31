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
     // roadName_area_colony,
      availabilitySlot,
    } = req.body;
    const userId = req.user.id;
    //const user=await User.findById({userId});
    console.log("infor from frotend",req.body);
    
    try {
        // Find the manager based on the address
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({ message: "Invalid user ID" });
        //   }
        const manager = await User.findOne({
          role: "Manager",
          pincode:pincode,
           state:state,
          city:city,
       // roadName_area_colony: { $in: roadName_area_colony }
        });
    console.log("Manager :", manager);
        if (!manager) {
            console.log("manager not found");
          return res.status(404).json({ message: "Manager not found for the specified area" });
        }
        const managerId=manager._id.toString();
      
  console.log("manager found");
      // Create the complaint
      const complaint = new Complaint({
        user: userId,
        manager: manager._id,
        serviceRequired,
        description,
        pincode,
        state,
        city,
        houseNo_buildingName,
      //  roadName_area_colony,
        availabilitySlot,
      });
      //console.log(error)
      await complaint.save();
      // Get user information for sending email
      console.log("Complaint created");
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
        // Send email to manager
        try {
            const managerEmail = `
                <h2>New Complaint Register</h2>
                <p>A new complaint is successfully registered.</p>
                <p>You must resolve this.</p>`;
            await mailSender(manager.email, 'New Complaint Made', managerEmail);
            console.log("manager mail send");
        } catch (emailError) {
            console.error("Error sending email to manager:", emailError.message);
        }
        try{
        //user mailbody
        const useremail = `
        <h2>New Complaint registered</h2>
        <p>You registered a new complaint.</p>     
        <p>Your complaint will be resolve in few days.</p>
         `;
        await mailSender(user.email, 'New Complaint Registered', useremail);
        console.log("user mail send");
        }catch (emailError) {
            console.error("Error sending email to user:", emailError.message);
        }

        console.log("created complaint successfully",complaint);
        return res.status(201).json({ message: "Complaint created successfully", complaint });
    } catch (error) {
        console.error("Create Complaint error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const resolveComplaint = async(req,res) =>{
  const {complaintId,amount}=req.body;
  try{
    const complaint = await Complaint.findById(complaintId);
    if(!complaint){
      console.log("complaint not found");
      return res.status(404).json({ message: "Complaint not found" });
    }
    complaint.amount=amount;
    complaint.status = "Resolved";

    await complaint.save();
    console.log("Complaint Resolved");
    return res.status(200).json({ message: "Complaint resolved and amount set successfully" });
    } catch (error) {
        console.error("Error in resolving complaint:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports={createComplaint,resolveComplaint};

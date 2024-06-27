const User = require("../models/user.js");
const { hashPassword,comparePassword } = require("../utils/bcrypt.utils.js");
const  { isValidEmail, isStrongPassword } =require("../utils/validators.js");
const {generateToken} = require("../utils/generateToken.js")

//signup controller
 const signup = async (req, res) => {
  const { fullName, email, password, role, pincode, state, city, roadName_area_colony } = req.body;

  //validation
  if (!fullName) {
    return res.status(400).json({ message: "Please enter fullName" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please enter valid email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }

  //validate
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }
  if (!isStrongPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password does not meet the strength requirements" });
  }
  // // Manager-specific validation
  // if (role === 'Manager' && (!pincode || !city || !state || !roadName_area_colony)) {
  //   return res.status(400).json({ message: "Please fill all required fields for Manager" });
  // } 
  try {
    // Finding existing user with same email
    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail) {
      console.log("A user with this email already exists");
      return res
        .status(422)
        .json({ error: "A user with this email already exists" });
    }
   
  // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    });

     // Assign address details only if role is Manager
     if (role === 'Manager') {
      newUser.pincode = pincode;
      newUser.state = state;
      newUser.city = city;
      newUser.roadName_area_colony = roadName_area_colony;
  }
  await newUser.save();

    console.log("User registered successfully");
    console.log("User",newUser);
    // Send a success response
    return res.status(201).json({
      message: "User registered successfully",
       user: {
                id: newUser._id,
                fullName,
                email,
                role,
            },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


/*========================================login controller====================================================*/

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }

  try {
      // Find the user by email
      const user = await User.findOne({ email :email});
      if (!user) {
        console.log("User not found")
          return res.status(401).json({ message: "User not found. signUp first", });
      }

      // Check if password matches
      const isMatch = comparePassword(password,user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT
      const token = generateToken(user);

      // Respond with token
      console.log("User :",user);
    
      return res.status(200).json({
        token,
        role: user.role, // Include the role in the response
    });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password').exec();
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
  } catch (error) {
      console.error("Get Profile error:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};

//=====================================================FORGET-PASSWORD =====================================================================================



module.exports = {signup,login,getProfile};





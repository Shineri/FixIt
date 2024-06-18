const User = require("../models/user.js");
const { hashPassword,comparePassword } = require("../utils/bcrypt.utils.js");
const  { isValidEmail, isStrongPassword } =require("../utils/validators.js");
const {generateToken} = require("../utils/generateToken.js")

//signup controller
 const signup = async (req, res) => {
  const { fullName, email, password,role } = req.body;

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
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });
    console.log("User registered successfully");
    console.log("User",newUser);
    // Send a success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: fullName,
        email: email,
        role: newUser.role,
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
      return res
      .status(200)
      .json({ token });

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





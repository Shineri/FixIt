const bcrypt = require("bcryptjs");

// Function to hash a password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Function to compare passwords
 const comparePassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {hashPassword,comparePassword};
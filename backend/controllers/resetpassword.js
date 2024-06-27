const jwt = require('jsonwebtoken');
const User = require("../models/user.js");
const sendResetPasswordEmail= require("../utils/mailSender.js");
const { hashPassword } = require("../utils/bcrypt.utils.js");
const {generateToken} = require("../utils/generateToken.js");
const  {  isStrongPassword } =require("../utils/validators.js");

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Please enter email" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = generateToken(user);
        

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const emailBody = `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Please use the following link to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
         `;

        await sendResetPasswordEmail(user.email, "Password Reset Request", emailBody);
        console.log("token-->", resetToken);
    
        return res.status(200).json({ message: "Password reset email sent" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
//==============================RESET-PASSWORD===================================================

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
        return res.status(400).json({ message: "Please enter both new and confirm passwords" });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    if (!isStrongPassword(newPassword)) {
        return res.status(400).json({ message: "Password does not meet the strength requirements" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        return res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { requestPasswordReset, resetPassword };
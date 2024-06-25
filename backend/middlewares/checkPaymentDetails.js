const User = require('../models/user');

const checkPaymentDetails = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming req.user contains authenticated user info
        const user = await User.findById(userId).populate('paymentDetails');

        if (user.role === "Manager" && !user.paymentDetails) {
            return res.status(403).json({ message: "Please fill in your payment details." });
        }

        next();
    } catch (error) {
        console.error("Error in checking payment details:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = checkPaymentDetails;

const stripe = require('stripe')('your_stripe_secret_key');
const PaymentDetails = require('../models/paymentDetails');
const Complaint = require('../models/complaint');

const processPayment = async (req, res) => {
    const { complaintId, paymentMethodId } = req.body;

    try {
        const complaint = await Complaint.findById(complaintId).populate('manager');
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        const amount = complaint.amount;
        const paymentDetails = await PaymentDetails.findOne({ manager: complaint.manager._id });
        if (!paymentDetails) {
            return res.status(404).json({ message: "Manager's payment details not found" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            transfer_data: {
                destination: paymentDetails.stripeAccountId, // Assuming you have stored Stripe account ID of the manager
            }
        });

        complaint.status = 'Paid';
        await complaint.save();

        return res.status(200).json({ message: "Payment successful and complaint marked as paid", paymentIntent });
    } catch (error) {
        console.error("Error processing payment:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { processPayment };

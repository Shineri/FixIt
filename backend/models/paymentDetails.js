const mongoose = require('mongoose');

const paymentDetailsSchema = new mongoose.Schema({
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    IFSC: {
        type: String,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    UPI: {
        type: String
    },
    stripeAccountId: {
        type: String,
        required: false 
    }
}, {
    timestamps: true,
    collection: "paymentDetails"
});

module.exports = mongoose.model('PaymentDetails', paymentDetailsSchema);

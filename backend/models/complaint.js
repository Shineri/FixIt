const mongoose = require('mongoose');


const complaintSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming manager is also a user
        required: true
    },
    address: {
        type: String,
        required: true
    },
    buildingName: {
        type: String,
        required: true
    },
    societyName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Maintenance', 'Noise', 'Security', 'Other'] // Add more types as needed
    },

    paymentRequired: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Not Required'],
        default: 'Not Required'
    },
    amount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);

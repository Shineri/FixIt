const mongoose = require('mongoose');


const complaintSchema = new mongoose.Schema({
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
    serviceRequired: {
        type: String,
        required: true,
        enum: ['Electrician', 'Plumber', 'Carpenter','Bathroom Cleaner', 'Other'] // Add more types as needed
    },
    description: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    houseNo_buildingName: {
        type: [String],
        // required: true,
        // validate: {
        //     validator: function(value) {
        //         return value.length >= 1; // At least one element is needed
        //     },
        //     message: 'HouseNo./BuildingName should have at least one element'
        // }
        default:[]
    },
    roadName_area_colony: {
        type: [String],
        // required: true,
        // validate: {
        //     validator: function(value) {
        //         return value.length >= 1; // At least one element is needed
        //     },
        //     message: 'roadName_area_colony should have at least one element'
        // }
        default:[]
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    assigned_worker:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker', 
        required: false // Assigned later by the manager
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Not Required'],
        default: 'Pending'
    },
    amount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    availabilitySlot: {
        type: String,
        required: true,
        enum: ["Morning", "Afternoon"]
    }
},
{
    timestamps: true,
    collection: 'complaints'
});


module.exports = mongoose.model('Complaint', complaintSchema);

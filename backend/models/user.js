const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["User", "Manager"],
        default: "User",
    },
    pincode: {
        type: String,
        required: function () { return this.role === 'Manager'; }
    },
    state: {
        type: String,
        required: function () { return this.role === 'Manager'; }
    },
    city: {
        type: String,
        required: function () { return this.role === 'Manager'; }
    },
    roadName_area_colony: {
        type: [String],
        required: function () { return this.role === 'Manager'; },
        validate: {
            validator: function(value) {
                return value.length >= 1; // At least one element is needed
            },
            message: 'roadName_area_colony should have at least one element'
        }
    
    },
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    }],
    paymentDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentDetails'
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, {
    timestamps: true,
    collection: "users"
});



module.exports = mongoose.model("User",userSchema);
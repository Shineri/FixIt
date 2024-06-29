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
        required: function () { return this.role === 'Manager'; },
        default: null
    },
    state: {
        type: String,
        required: function () { return this.role === 'Manager'; },
        default: null
    },
    city: {
        type: String,
        required: function () { return this.role === 'Manager'; },
        default: null
    },
     roadName_area_colony: {
         type: [String],
    //      required: function () { return this.role === 'Manager'; },
        // validate: {
        //     validator: function(value) {
        //         return this.role==="User" || (this.role==="Manager" && value.length >= 1); // At least one element is needed
        //     },
        //     message: 'roadName_area_colony should have at least one element'
        // },
        default: []
    
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
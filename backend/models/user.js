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
},
    {
        timestamps: true,
        collection: "users"
    }

);

module.exports = mongoose.model("User",userSchema);
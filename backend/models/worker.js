const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    services: {
      type: [String],
      enum : ['Electrician', 'Plumber', 'Carpenter','Bathroom Cleaner','other'],
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status:{
      type : String,
      enum : ["Assigned","Not Assigned"],
      default : "Not Assigned"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Worker", workerSchema);

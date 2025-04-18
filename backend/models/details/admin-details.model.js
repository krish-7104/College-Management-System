const mongoose = require("mongoose");

const adminDetails = new mongoose.Schema(
  {
    credential: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Credential",
      required: true,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminDetail", adminDetails);

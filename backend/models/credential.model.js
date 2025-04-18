const mongoose = require("mongoose");

const credential = new mongoose.Schema(
  {
    loginId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Credential", credential);

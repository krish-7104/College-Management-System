const mongoose = require("mongoose");

const Branch = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", Branch);

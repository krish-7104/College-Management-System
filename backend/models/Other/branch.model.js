const mongoose = require("mongoose");

const Branch = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Branch", Branch);

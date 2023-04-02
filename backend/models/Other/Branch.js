const mongoose = require("mongoose");

const Branch = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Branch", Branch);

const mongoose = require("mongoose");

const Marks = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  internal: {
    type: Map,
  },
  external: {
    type: Map,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mark", Marks);

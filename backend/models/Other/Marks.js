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
  }
}, { timestamps: true });

module.exports = mongoose.model("Mark", Marks);

const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  examType: {
    type: String,
    required: true,
    enum: ["mid", "end"],
  },
  timetableLink: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Exam", examSchema);

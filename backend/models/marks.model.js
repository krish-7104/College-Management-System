const mongoose = require("mongoose");

const Marks = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    marks: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        internal: {
          type: Number,
          min: 0,
          max: 40,
          default: 0,
        },
        external: {
          type: Number,
          min: 0,
          max: 60,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

// Compound index to ensure unique marks per student per semester
Marks.index({ student: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("Mark", Marks);

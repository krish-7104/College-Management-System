const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentDetailsSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

studentDetailsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const studentDetails = mongoose.model("StudentDetail", studentDetailsSchema);

module.exports = studentDetails;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const facultyDetailsSchema = new mongoose.Schema(
  {
    employeeId: {
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
    department: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    post: {
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

facultyDetailsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const facultyDetails = mongoose.model("FacultyDetail", facultyDetailsSchema);

module.exports = facultyDetails;

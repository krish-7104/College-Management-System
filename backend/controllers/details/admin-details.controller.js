const adminDetails = require("../../models/details/admin-details.model");
const bcrypt = require("bcryptjs");
const ApiResponse = require("../../utils/ApiResponse");
const jwt = require("jsonwebtoken");

const loginAdminController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await adminDetails.findOne({ email }).populate("branch");

    if (!user) {
      return ApiResponse.notFound("User not found").send(res);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return ApiResponse.unauthorized("Invalid password").send(res);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return ApiResponse.success({ token }, "Login successful").send(res);
  } catch (error) {
    console.error("Login Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const getAllDetailsController = async (req, res, next) => {
  try {
    const { type } = req.query;

    const users = await adminDetails
      .find()
      .select("-__v -password")
      .populate("branch");

    if (!users || users.length === 0) {
      return ApiResponse.notFound("No Admin Found").send(res);
    }

    const filteredUsers = users.map((user) => {
      const userData = user.toObject();
      if (type !== "superAdmin") {
        delete userData.salary;
      }
      return userData;
    });

    return ApiResponse.success(filteredUsers, "Admin Details Found!").send(res);
  } catch (error) {
    console.error("Get Details Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const registerAdminController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ApiResponse.badRequest("Invalid email format").send(res);
    }

    if (!/^\d{10}$/.test(req.body.phone)) {
      return ApiResponse.badRequest("Phone number must be 10 digits").send(res);
    }

    const existingAdmin = await adminDetails.findOne({
      $or: [{ phone: req.body.phone }, { email: email }],
    });

    if (existingAdmin) {
      return ApiResponse.conflict(
        "Admin with these details already exists"
      ).send(res);
    }

    const user = await adminDetails.create({
      ...req.body,
    });

    const sanitizedUser = await adminDetails
      .findById(user._id)
      .select("-__v -password")
      .populate("branch");

    return ApiResponse.created(sanitizedUser, "Admin Details Added!").send(res);
  } catch (error) {
    console.error("Add Details Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const getMyDetailsController = async (req, res, next) => {
  try {
    const user = await adminDetails
      .findById(req.userId)
      .select("-password -__v")
      .populate("branch");

    if (!user) {
      return ApiResponse.notFound("User not found").send(res);
    }

    const userData = user.toObject();
    if (user.type !== "superAdmin") {
      delete userData.salary;
    }

    return ApiResponse.success(userData, "My Details Found!").send(res);
  } catch (error) {
    console.error("Get My Details Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const updateDetailsController = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return ApiResponse.badRequest("Admin ID is required").send(res);
    }

    const updateData = { ...req.body };
    const { email, phone, password, salary, type } = updateData;

    if (salary && type !== "superAdmin") {
      return ApiResponse.forbidden(
        "Only superAdmin can update salary details"
      ).send(res);
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ApiResponse.badRequest("Invalid email format").send(res);
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return ApiResponse.badRequest("Phone number must be 10 digits").send(res);
    }

    if (password && password.length < 8) {
      return ApiResponse.badRequest(
        "Password must be at least 8 characters long"
      ).send(res);
    }

    if (phone) {
      const existingAdmin = await adminDetails.findOne({
        _id: { $ne: req.params.id },
        phone: phone,
      });

      if (existingAdmin) {
        return ApiResponse.conflict("Phone number already in use").send(res);
      }
    }

    if (email) {
      const existingAdmin = await adminDetails.findOne({
        _id: { $ne: req.params.id },
        email: email,
      });

      if (existingAdmin) {
        return ApiResponse.conflict("Email already in use").send(res);
      }
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      updateData.profile = req.file.filename;
    }

    // Convert date strings to Date objects if present
    if (updateData.dob) {
      updateData.dob = new Date(updateData.dob);
    }
    if (updateData.joiningDate) {
      updateData.joiningDate = new Date(updateData.joiningDate);
    }

    const updatedUser = await adminDetails
      .findByIdAndUpdate(req.params.id, updateData, { new: true })
      .select("-__v -password")
      .populate("branch");

    if (!updatedUser) {
      return ApiResponse.notFound("Admin not found").send(res);
    }

    const responseData = updatedUser.toObject();
    if (type !== "superAdmin") {
      delete responseData.salary;
    }

    return ApiResponse.success(responseData, "Updated Successfully!").send(res);
  } catch (error) {
    console.error("Update Details Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const deleteDetailsController = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return ApiResponse.badRequest("Admin ID is required").send(res);
    }

    const user = await adminDetails.findById(req.params.id);

    if (!user) {
      return ApiResponse.notFound("No Admin Found").send(res);
    }

    await adminDetails.findByIdAndDelete(req.params.id);

    return ApiResponse.success(null, "Deleted Successfully!").send(res);
  } catch (error) {
    console.error("Delete Details Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  loginAdminController,
  getAllDetailsController,
  registerAdminController,
  updateDetailsController,
  deleteDetailsController,
  getMyDetailsController,
};

const adminDetails = require("../models/details/admin-details.model");
const Credential = require("../models/credential.model");
const bcrypt = require("bcryptjs");
const ApiResponse = require("../utils/ApiResponse");

const getDetailsController = async (req, res, next) => {
  try {
    const { type } = req.query;

    const users = await adminDetails
      .find()
      .populate("credential", "-password")
      .select("-__v");

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
    next(error);
  }
};

const getDetailsByIdController = async (req, res, next) => {
  try {
    const { type } = req.query;

    if (!req.params.id) {
      return ApiResponse.badRequest("Admin ID is required").send(res);
    }

    const user = await adminDetails
      .findById(req.params.id)
      .populate("credential", "-password")
      .select("-__v");

    if (!user) {
      return ApiResponse.notFound("No Admin Found").send(res);
    }

    const userData = user.toObject();
    if (type !== "superAdmin") {
      delete userData.salary;
    }

    return ApiResponse.success(userData, "Admin Details Found!").send(res);
  } catch (error) {
    next(error);
  }
};

const addDetailsController = async (req, res, next) => {
  try {
    const password = req.body.password || "admin123";

    if (password.length < 8) {
      return ApiResponse.badRequest(
        "Password must be at least 8 characters long"
      ).send(res);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      return ApiResponse.badRequest("Invalid email format").send(res);
    }

    if (!/^\d{10}$/.test(req.body.phone)) {
      return ApiResponse.badRequest("Phone number must be 10 digits").send(res);
    }

    const existingAdmin = await adminDetails.findOne({
      $or: [
        { employeeId: req.body.employeeId },
        { email: req.body.email },
        { phone: req.body.phone },
      ],
    });

    if (existingAdmin) {
      return ApiResponse.conflict(
        "Admin with these details already exists"
      ).send(res);
    }

    // First create credential
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let credential;
    try {
      credential = await Credential.create({
        loginId: req.body.email,
        password: hashedPassword,
        role: "admin",
      });
    } catch (error) {
      return ApiResponse.badRequest("Failed to create credential").send(res);
    }

    // Then create admin details
    try {
      const user = await adminDetails.create({
        ...req.body,
        credential: credential._id,
      });

      const sanitizedUser = await adminDetails
        .findById(user._id)
        .populate("credential", "-password")
        .select("-__v");

      const responseData = sanitizedUser.toObject();

      return ApiResponse.created(responseData, "Admin Details Added!").send(
        res
      );
    } catch (error) {
      // If admin details creation fails, delete the created credential
      await Credential.findByIdAndDelete(credential._id);
      throw error;
    }
  } catch (error) {
    next(error);
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
      delete updateData.salary;
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

    if (email || phone) {
      const existingAdmin = await adminDetails.findOne({
        _id: { $ne: req.params.id },
        $or: [{ email: email }, { phone: phone }],
      });

      if (existingAdmin) {
        return ApiResponse.conflict(
          "Email or phone number already in use"
        ).send(res);
      }
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

    const user = await adminDetails
      .findById(req.params.id)
      .populate("credential");

    if (!user) {
      return ApiResponse.notFound("No Admin Found").send(res);
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await Credential.findByIdAndUpdate(user.credential._id, {
        password: hashedPassword,
      });
      delete updateData.password;
    }

    const updatedUser = await adminDetails
      .findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate("credential", "-password")
      .select("-__v");

    const responseData = updatedUser.toObject();
    if (type !== "superAdmin") {
      delete responseData.salary;
    }

    return ApiResponse.success(responseData, "Updated Successfully!").send(res);
  } catch (error) {
    next(error);
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

    if (!user.credential) {
      return ApiResponse.badRequest("Invalid admin data structure").send(res);
    }

    await Credential.findByIdAndDelete(user.credential);
    await adminDetails.findByIdAndDelete(req.params.id);

    return ApiResponse.success(null, "Deleted Successfully!").send(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDetailsController,
  getDetailsByIdController,
  addDetailsController,
  updateDetailsController,
  deleteDetailsController,
};

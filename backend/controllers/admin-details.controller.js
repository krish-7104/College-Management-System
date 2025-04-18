const adminDetails = require("../models/admin-details.model");
const Credential = require("../models/credential.model");
const bcrypt = require("bcryptjs");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const getDetails = async (req, res, next) => {
  try {
    const users = await adminDetails.find(req.body).populate("credential");
    if (!users || users.length === 0) {
      throw ApiError.notFound("No Admin Found");
    }
    return ApiResponse.success(users, "Admin Details Found!").send(res);
  } catch (error) {
    next(error);
  }
};

const addDetails = async (req, res, next) => {
  try {
    // First check if admin with employeeId exists
    const existingAdmin = await adminDetails.findOne({
      employeeId: req.body.employeeId,
    });
    if (existingAdmin) {
      throw ApiError.conflict("Admin With This EmployeeId Already Exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create credential first
    const credential = await Credential.create({
      loginId: req.body.employeeId.toString(),
      password: hashedPassword,
      role: "admin",
    });

    // Then create admin details with credential reference
    const user = await adminDetails.create({
      ...req.body,
      credential: credential._id,
      profile: req.file ? req.file.filename : null,
    });

    return ApiResponse.created(user, "Admin Details Added!").send(res);
  } catch (error) {
    next(error);
  }
};

const updateDetails = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profile = req.file.filename;
    }

    const user = await adminDetails
      .findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate("credential");

    if (!user) {
      throw ApiError.notFound("No Admin Found");
    }

    // If password is being updated, update the credential as well
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await Credential.findByIdAndUpdate(user.credential, {
        password: hashedPassword,
      });
    }

    return ApiResponse.success(user, "Updated Successfully!").send(res);
  } catch (error) {
    next(error);
  }
};

const deleteDetails = async (req, res, next) => {
  try {
    const user = await adminDetails.findById(req.params.id);
    if (!user) {
      throw ApiError.notFound("No Admin Found");
    }

    // Delete the credential first
    await Credential.findByIdAndDelete(user.credential);

    // Then delete the admin details
    await adminDetails.findByIdAndDelete(req.params.id);

    return ApiResponse.success(null, "Deleted Successfully!").send(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
};

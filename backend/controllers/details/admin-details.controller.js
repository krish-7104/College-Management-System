const adminDetails = require("../../models/details/admin-details.model.js");
const Credential = require("../../models/credential.model.js");
const bcrypt = require("bcryptjs");

const getDetails = async (req, res) => {
  try {
    let user = await adminDetails.find(req.body).populate("credential");
    if (!user || user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Admin Found" });
    }
    const data = {
      success: true,
      message: "Admin Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addDetails = async (req, res) => {
  try {
    // First check if admin with employeeId exists
    let existingAdmin = await adminDetails.findOne({
      employeeId: req.body.employeeId,
    });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin With This EmployeeId Already Exists",
      });
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

    const data = {
      success: true,
      message: "Admin Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateDetails = async (req, res) => {
  try {
    let user;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profile = req.file.filename;
    }

    user = await adminDetails.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found",
      });
    }

    // If password is being updated, update the credential as well
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await Credential.findByIdAndUpdate(user.credential, {
        password: hashedPassword,
      });
    }

    const data = {
      success: true,
      message: "Updated Successfully!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteDetails = async (req, res) => {
  try {
    const user = await adminDetails.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found",
      });
    }

    // Delete the credential first
    await Credential.findByIdAndDelete(user.credential);

    // Then delete the admin details
    await adminDetails.findByIdAndDelete(req.params.id);

    const data = {
      success: true,
      message: "Deleted Successfully!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  try {
    let user = await studentDetails.count(req.body);
    const data = {
      success: true,
      message: "Count Successfull!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
};

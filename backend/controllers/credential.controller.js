const Credential = require("../models/credential.model");

const getCredentials = async (req, res) => {
  try {
    const { type } = req.params;
    let credentials = await Credential.find({ ...req.body, role: type });
    if (!credentials || credentials.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Credentials Found" });
    }
    const data = {
      success: true,
      message: "Credentials Found!",
      credentials,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addCredential = async (req, res) => {
  try {
    const { type } = req.params;
    let credential = await Credential.findOne({
      loginId: req.body.loginId,
      role: type,
    });
    if (credential) {
      return res.status(400).json({
        success: false,
        message: "Credential With This LoginId Already Exists",
      });
    }
    credential = await Credential.create(req.body);
    const data = {
      success: true,
      message: "Credential Added!",
      credential,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCredential = async (req, res) => {
  try {
    const { type } = req.params;
    let credential = await Credential.findByIdAndUpdate(
      req.params.id,
      { ...req.body, role: type },
      { new: true }
    );
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "No Credential Found",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfully!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCredential = async (req, res) => {
  try {
    const { type } = req.params;
    let credential = await Credential.findByIdAndDelete(req.params.id, {
      role: type,
    });
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "No Credential Found",
      });
    }
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

module.exports = {
  getCredentials,
  addCredential,
  updateCredential,
  deleteCredential,
};

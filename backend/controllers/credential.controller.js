const Credential = require("../models/credential.model");
const ApiResponse = require("../utils/ApiResponse");

const addCredentialController = async (req, res) => {
  try {
    const { type } = req.params;
    let credential = await Credential.findOne({
      loginId: req.body.loginId,
      role: type,
    });
    if (credential) {
      return ApiResponse.badRequest(
        "Credential with this login ID already exists"
      ).send(res);
    }
    credential = await Credential.create({ ...req.body, role: type });
    return ApiResponse.created(
      credential,
      "Credential added successfully"
    ).send(res);
  } catch (error) {
    console.error(error);
    return ApiResponse.internalServerError().send(res);
  }
};

const updateCredentialController = async (req, res) => {
  try {
    const { type } = req.params;
    let credential = await Credential.findByIdAndUpdate(
      req.params.id,
      { ...req.body, role: type },
      { new: true }
    );
    if (!credential) {
      return ApiResponse.notFound("No credential found").send(res);
    }
    return ApiResponse.success(credential, "Updated successfully").send(res);
  } catch (error) {
    console.error(error);
    return ApiResponse.internalServerError().send(res);
  }
};

const deleteCredentialController = async (req, res) => {
  try {
    const { type } = req.params;
    let credential = await Credential.findByIdAndDelete(req.params.id);
    if (!credential || credential.role !== type) {
      return ApiResponse.notFound("No credential found").send(res);
    }
    return ApiResponse.success(null, "Deleted successfully").send(res);
  } catch (error) {
    console.error(error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  addCredentialController,
  updateCredentialController,
  deleteCredentialController,
};

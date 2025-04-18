const Subject = require("../models/subject.model");
const ApiResponse = require("../utils/ApiResponse");

const getSubjectController = async (req, res) => {
  try {
    const { branch, semester } = req.query;
    let query = {};
    if (branch) query.branch = branch;
    if (semester) query.semester = semester;
    let subjects = await Subject.find(query).populate("branch");
    if (!subjects || subjects.length === 0) {
      return ApiResponse.error("No Subjects Found", 404).send(res);
    }
    return ApiResponse.success(subjects, "All Subjects Loaded!").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};

const addSubjectController = async (req, res) => {
  const { name, code, branch, semester, credits } = req.body;

  if (!name || !code || !branch || !semester || !credits) {
    return ApiResponse.error("All fields are required", 400).send(res);
  }

  try {
    let subject = await Subject.findOne({ code });
    if (subject) {
      return ApiResponse.error("Subject Already Exists", 409).send(res);
    }

    const newSubject = await Subject.create({
      name,
      code,
      branch,
      semester,
      credits,
    });

    return ApiResponse.created(newSubject, "Subject Added Successfully!").send(
      res
    );
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};

const updateSubjectController = async (req, res) => {
  const { name, code, branch, semester, credits } = req.body;
  const updateFields = {};

  if (name) updateFields.name = name;
  if (code) updateFields.code = code;
  if (branch) updateFields.branch = branch;
  if (semester) updateFields.semester = semester;
  if (credits) updateFields.credits = credits;

  if (Object.keys(updateFields).length === 0) {
    return ApiResponse.error("No fields provided for update", 400).send(res);
  }

  try {
    let subject = await Subject.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    if (!subject) {
      return ApiResponse.error("Subject Not Found!", 404).send(res);
    }

    return ApiResponse.success(subject, "Subject Updated Successfully!").send(
      res
    );
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};

const deleteSubjectController = async (req, res) => {
  try {
    if (!req.params.id) {
      return ApiResponse.error("Subject ID is required", 400).send(res);
    }

    let subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return ApiResponse.error("Subject Not Found!", 404).send(res);
    }
    return ApiResponse.success(null, "Subject Deleted Successfully!").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};

module.exports = {
  getSubjectController,
  addSubjectController,
  deleteSubjectController,
  updateSubjectController,
};

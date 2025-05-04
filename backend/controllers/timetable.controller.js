const Timetable = require("../models/timetable.model");
const ApiResponse = require("../utils/ApiResponse");

const getTimetableController = async (req, res) => {
  try {
    const { semester, branch } = req.query;
    let query = {};

    if (semester) query.semester = semester;
    if (branch) query.branch = branch;

    const timetables = await Timetable.find(query)
      .populate("branch")
      .sort({ createdAt: -1 });

    if (!timetables || timetables.length === 0) {
      return ApiResponse.notFound("No timetables found").send(res);
    }

    return ApiResponse.success(
      timetables,
      "Timetables retrieved successfully"
    ).send(res);
  } catch (error) {
    console.error("Get Timetable Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const addTimetableController = async (req, res) => {
  try {
    const { semester, branch } = req.body;

    if (!semester || !branch) {
      return ApiResponse.badRequest("Semester and branch are required").send(
        res
      );
    }

    if (!req.file) {
      return ApiResponse.badRequest("Timetable file is required").send(res);
    }

    let timetable = await Timetable.findOne({ semester, branch });

    if (timetable) {
      timetable = await Timetable.findByIdAndUpdate(
        timetable._id,
        {
          semester,
          branch,
          link: req.file.filename,
        },
        { new: true }
      );
      return ApiResponse.success(
        timetable,
        "Timetable updated successfully"
      ).send(res);
    }

    timetable = await Timetable.create({
      semester,
      branch,
      link: req.file.filename,
    });

    return ApiResponse.created(timetable, "Timetable added successfully").send(
      res
    );
  } catch (error) {
    console.error("Add Timetable Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const updateTimetableController = async (req, res) => {
  try {
    const { id } = req.params;
    const { semester, branch } = req.body;

    if (!id) {
      return ApiResponse.badRequest("Timetable ID is required").send(res);
    }

    const timetable = await Timetable.findByIdAndUpdate(
      id,
      {
        semester,
        branch,
        link: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    if (!timetable) {
      return ApiResponse.notFound("Timetable not found").send(res);
    }

    return ApiResponse.success(
      timetable,
      "Timetable updated successfully"
    ).send(res);
  } catch (error) {
    console.error("Update Timetable Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const deleteTimetableController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return ApiResponse.badRequest("Timetable ID is required").send(res);
    }

    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return ApiResponse.notFound("Timetable not found").send(res);
    }

    return ApiResponse.success(null, "Timetable deleted successfully").send(
      res
    );
  } catch (error) {
    console.error("Delete Timetable Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  getTimetableController,
  addTimetableController,
  updateTimetableController,
  deleteTimetableController,
};

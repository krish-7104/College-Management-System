const Notice = require("../models/notice.model");
const ApiResponse = require("../utils/ApiResponse");

const getNoticeController = async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    if (!notices || notices.length === 0) {
      return ApiResponse.notFound("No notices found").send(res);
    }

    return ApiResponse.success(notices, "Notices retrieved successfully").send(
      res
    );
  } catch (error) {
    console.error("Get Notice Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const addNoticeController = async (req, res, next) => {
  try {
    const { title, description, type, link } = req.body;

    if (!title || !description || !type) {
      return ApiResponse.badRequest(
        "Title, description and type are required"
      ).send(res);
    }

    if (!["student", "faculty", "both"].includes(type)) {
      return ApiResponse.badRequest("Invalid notice type").send(res);
    }

    const notice = await Notice.create({
      title,
      description,
      type,
      link: link || null,
    });

    return ApiResponse.created(notice, "Notice created successfully").send(res);
  } catch (error) {
    console.error("Add Notice Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const updateNoticeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, type, link } = req.body;

    if (!id) {
      return ApiResponse.badRequest("Notice ID is required").send(res);
    }

    if (type && !["student", "faculty", "both"].includes(type)) {
      return ApiResponse.badRequest("Invalid notice type").send(res);
    }

    const notice = await Notice.findByIdAndUpdate(
      id,
      {
        title,
        description,
        type,
        link,
      },
      { new: true }
    );

    if (!notice) {
      return ApiResponse.notFound("Notice not found").send(res);
    }

    return ApiResponse.success(notice, "Notice updated successfully").send(res);
  } catch (error) {
    console.error("Update Notice Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

const deleteNoticeController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return ApiResponse.badRequest("Notice ID is required").send(res);
    }

    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return ApiResponse.notFound("Notice not found").send(res);
    }

    return ApiResponse.success(null, "Notice deleted successfully").send(res);
  } catch (error) {
    console.error("Delete Notice Error: ", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = {
  getNoticeController,
  addNoticeController,
  updateNoticeController,
  deleteNoticeController,
};

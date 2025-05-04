const express = require("express");
const router = express.Router();
const {
  loginFacultyController,
  registerFacultyController,
  updateFacultyController,
  deleteFacultyController,
  getAllFacultyController,
  getMyFacultyDetailsController,
  sendFacultyResetPasswordEmail,
  updateFacultyPasswordHandler,
  updateLoggedInPasswordController,
} = require("../../controllers/details/faculty-details.controller");
const upload = require("../../middlewares/multer.middleware");
const auth = require("../../middlewares/auth.middleware");

router.post("/register", upload.single("file"), registerFacultyController);
router.post("/login", loginFacultyController);
router.get("/my-details", auth, getMyFacultyDetailsController);

router.get("/", auth, getAllFacultyController);
router.patch("/:id", auth, upload.single("file"), updateFacultyController);
router.delete("/:id", auth, deleteFacultyController);
router.post("/forget-password", sendFacultyResetPasswordEmail);
router.post("/update-password/:resetId", updateFacultyPasswordHandler);
router.post("/change-password", auth, updateLoggedInPasswordController);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllDetailsController,
  registerAdminController,
  updateDetailsController,
  deleteDetailsController,
  loginAdminController,
  getMyDetailsController,
  sendForgetPasswordEmail,
  updatePasswordHandler,
  updateLoggedInPasswordController,
} = require("../../controllers/details/admin-details.controller");
const upload = require("../../middlewares/multer.middleware");
const auth = require("../../middlewares/auth.middleware");

router.post("/register", upload.single("file"), registerAdminController);
router.post("/login", loginAdminController);
router.get("/my-details", auth, getMyDetailsController);

router.get("/", auth, getAllDetailsController);
router.patch("/:id", auth, upload.single("file"), updateDetailsController);
router.delete("/:id", auth, deleteDetailsController);
router.post("/forget-password", sendForgetPasswordEmail);
router.post("/update-password/:resetId", updatePasswordHandler);
router.post("/change-password", auth, updateLoggedInPasswordController);

module.exports = router;

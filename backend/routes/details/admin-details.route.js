const express = require("express");
const router = express.Router();
const {
  getDetailsController,
  getDetailsByIdController,
  addDetailsController,
  updateDetailsController,
  deleteDetailsController,
} = require("../../controllers/admin-details.controller");
const upload = require("../../middlewares/multer.middleware");

router.get("/", getDetailsController);
router.get("/:id", getDetailsByIdController);
router.post("/", upload.single("file"), addDetailsController);
router.put("/:id", upload.single("file"), updateDetailsController);
router.delete("/:id", deleteDetailsController);

module.exports = router;

const express = require("express");
const {
  getAllExamsController,
  addExamController,
  updateExamController,
  deleteExamController,
} = require("../controllers/exam.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");

router.get("/", auth, getAllExamsController);
router.post("/", auth, upload.single("file"), addExamController);
router.patch("/:id", auth, upload.single("file"), updateExamController);
router.delete("/:id", auth, deleteExamController);

module.exports = router;

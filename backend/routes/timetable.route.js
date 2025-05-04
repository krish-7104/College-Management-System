require("dotenv").config();
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const auth = require("../middlewares/auth.middleware");
const {
  getTimetableController,
  addTimetableController,
  updateTimetableController,
  deleteTimetableController,
} = require("../controllers/timetable.controller");

router.get("/", auth, getTimetableController);

router.post("/", auth, upload.single("file"), addTimetableController);

router.put("/:id", auth, upload.single("file"), updateTimetableController);

router.delete("/:id", auth, deleteTimetableController);

module.exports = router;

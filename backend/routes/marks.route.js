const express = require("express");
const {
  getMarksController,
  addMarksController,
  deleteMarksController,
} = require("../controllers/marks.controller");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.post("/student", auth, getMarksController);
router.post("/upload", auth, addMarksController);
router.delete("/:id", auth, deleteMarksController);

module.exports = router;

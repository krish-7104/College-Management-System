const express = require("express");
const {
  getSubjectController,
  addSubjectController,
  deleteSubjectController,
  updateSubjectController,
} = require("../controllers/subject.controller");
const router = express.Router();

router.get("/", getSubjectController);
router.post("/", addSubjectController);
router.delete("/:id", deleteSubjectController);
router.put("/:id", updateSubjectController);

module.exports = router;

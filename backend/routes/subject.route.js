const express = require("express");
const {
  getSubjectController,
  addSubjectController,
  deleteSubjectController,
  updateSubjectController,
} = require("../controllers/subject.controller");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
router.get("/", auth, getSubjectController);
router.post("/", auth, addSubjectController);
router.delete("/:id", auth, deleteSubjectController);
router.put("/:id", auth, updateSubjectController);

module.exports = router;

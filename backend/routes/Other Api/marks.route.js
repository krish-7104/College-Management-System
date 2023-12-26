const express = require("express");
const { getMarks, addMarks, deleteMarks } = require("../../controllers/Other/marks.controller");
const router = express.Router();

router.post("/getMarks", getMarks);
router.post("/addMarks", addMarks);
router.delete("/deleteMarks/:id", deleteMarks);

module.exports = router;

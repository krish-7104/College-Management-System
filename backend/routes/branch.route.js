const express = require("express");
const router = express.Router();
const {
  getBranchController,
  addBranchController,
  updateBranchController,
  deleteBranchController,
} = require("../controllers/branch.controller");

router.get("/", getBranchController);
router.post("/", addBranchController);
router.patch("/:id", updateBranchController);
router.delete("/:id", deleteBranchController);

module.exports = router;

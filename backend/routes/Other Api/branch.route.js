const express = require("express");
const router = express.Router();
const { getBranch, addBranch, deleteBranch } = require("../../controllers/Other/branch.controller.js");

router.get("/getBranch", getBranch);
router.post("/addBranch", addBranch);
router.delete("/deleteBranch/:id", deleteBranch);

module.exports = router;

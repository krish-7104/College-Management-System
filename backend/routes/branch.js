const express = require("express");
const router = express.Router();
const Branch = require("../models/Other/Branch");

router.get("/getBranch", async (req, res) => {
  try {
    let branches = await Branch.find();

    const data = {
      success: true,
      message: "All Branches Loaded!",
      branches,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addBranch", async (req, res) => {
  let { name } = req.body;
  try {
    let branch = await Branch.findOne({ name });
    if (branch) {
      const data = {
        success: false,
        message: "Already Exists!",
      };
      res.status(400).json(data);
    } else {
      await Branch.create(req.body);
      const data = {
        success: true,
        message: "Branch Added!",
      };
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteBranch/:id", async (req, res) => {
  try {
    let mark = await Branch.findByIdAndDelete(req.params.id);
    if (!mark) {
      return res
        .status(400)
        .json({ success: false, message: "No Branch Data Exists!" });
    }
    const data = {
      success: true,
      message: "Branch Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;

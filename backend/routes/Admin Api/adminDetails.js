const express = require("express");
const router = express.Router();
const adminDetails = require("../../models/Admin/AdminDetails");

router.post("/getDetails", async (req, res) => {
  try {
    let user = await adminDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Admin Found" });
    }
    const data = {
      success: true,
      message: "Admin Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addDetails", async (req, res) => {
  try {
    let user = await adminDetails.findOne(req.body);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Admin With This EmployeeId Already Exists",
      });
    }
    user = await adminDetails.create(req.body);
    const data = {
      success: true,
      message: "Admin Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateDetails/:id", async (req, res) => {
  try {
    let user = await adminDetails.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteDetails/:id", async (req, res) => {
  try {
    let user = await adminDetails.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;

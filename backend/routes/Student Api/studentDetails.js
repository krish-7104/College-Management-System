const express = require("express");
const router = express.Router();
const studentDetails = require("../../models/Students/StudentDetails");

router.post("/getDetails", async (req, res) => {
  try {
    let user = await studentDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Student Found" });
    }
    const data = {
      success: true,
      message: "Student Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addDetails", async (req, res) => {
  try {
    let user = await studentDetails.findOne({
      enrollmentNo: req.body.enrollmentNo,
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Student With This Enrollment Already Exists",
      });
    }
    user = await studentDetails.create(req.body);
    const data = {
      success: true,
      message: "Student Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateDetails/:id", async (req, res) => {
  try {
    let user = await studentDetails.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteDetails/:id", async (req, res) => {
  let { id } = req.body;
  try {
    let user = await studentDetails.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
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

router.get("/count", async (req, res) => {
  try {
    let user = await studentDetails.count(req.body);
    const data = {
      success: true,
      message: "Count Successfull!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
});

module.exports = router;

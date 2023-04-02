require("dotenv").config();
const express = require("express");
const router = express.Router();
const Timetable = require("../models/Other/Timetable");

router.post("/getTimetable", async (req, res) => {
  try {
    let timetable = await Timetable.find(req.body);
    if (timetable) {
      res.json(timetable);
    } else {
      res.status(404).json({ success: false, message: "Timetable Not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addTimetable", async (req, res) => {
  let { link, semester, branch } = req.body;
  try {
    let timetable = await Timetable.findOne({ semester, branch });
    if (timetable) {
      await Timetable.findByIdAndUpdate(timetable._id, req.body);
      const data = {
        success: true,
        message: "Timetable Updated!",
      };
      res.json(data);
    } else {
      await Timetable.create(req.body);
      const data = {
        success: true,
        message: "Timetable Added!",
      };
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteTimetable/:id", async (req, res) => {
  try {
    let timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) {
      return res
        .status(400)
        .json({ success: false, message: "No Timetable Exists!" });
    }
    const data = {
      success: true,
      message: "Timetable Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;

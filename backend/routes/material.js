const express = require("express");
const router = express.Router();
const Material = require("../models/Other/Material");

router.post("/getMaterial", async (req, res) => {
  try {
    let material = await Material.find(req.body);
    if (!material) {
      return res
        .status(400)
        .json({ success: false, message: "No Material Available!" });
    }
    res.json({ success: true, message: "Material Found!", material });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addMaterial", async (req, res) => {
  let { faculty, link, subject, title } = req.body;
  try {
    await Material.create({
      faculty,
      link,
      subject,
      title,
    });
    const data = {
      success: true,
      message: "Material Added!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateMaterial/:id", async (req, res) => {
  let { faculty, link, subject, title } = req.body;
  try {
    let material = await Material.findByIdAndUpdate(req.params.id, {
      faculty,
      link,
      subject,
      title,
    });
    if (!material) {
      return res
        .status(400)
        .json({ success: false, message: "No Material Available!" });
    }
    res.json({
      success: true,
      message: "Material Updated!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteMaterial/:id", async (req, res) => {
  try {
    let material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res
        .status(400)
        .json({ success: false, error: "No Material Available!" });
    }
    res.json({
      success: true,
      message: "Material Deleted!",
      material,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

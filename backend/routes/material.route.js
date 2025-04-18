const express = require("express");
const router = express.Router();
const {
  getMaterial,
  addMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/Other/material.controller");
const upload = require("../middlewares/multer.middleware");

router.post("/getMaterial", getMaterial);
router.post("/addMaterial", upload.single("material"), addMaterial);
router.put("/updateMaterial/:id", updateMaterial);
router.delete("/deleteMaterial/:id", deleteMaterial);

module.exports = router;

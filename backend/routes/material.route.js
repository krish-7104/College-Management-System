const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const auth = require("../middlewares/auth.middleware");
const {
  getMaterialsController,
  addMaterialController,
  updateMaterialController,
  deleteMaterialController,
} = require("../controllers/material.controller");

// Get all materials (can filter by subject, faculty, semester, branch, type)
router.get("/", auth, getMaterialsController);

// Add new material
router.post("/", auth, upload.single("file"), addMaterialController);

// Update material
router.put("/:id", auth, upload.single("file"), updateMaterialController);

// Delete material
router.delete("/:id", auth, deleteMaterialController);

module.exports = router;

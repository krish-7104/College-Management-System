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

router.get("/", auth, getMaterialsController);
router.post("/", auth, upload.single("file"), addMaterialController);
router.put("/:id", auth, upload.single("file"), updateMaterialController);
router.delete("/:id", auth, deleteMaterialController);

module.exports = router;

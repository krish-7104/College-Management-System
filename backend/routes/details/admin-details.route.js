const express = require("express");
const router = express.Router();
const {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
} = require("../../controllers/Admin/details.controller");
const upload = require("../../middlewares/multer.middleware");
router.post("/getDetails", getDetails);

router.post("/addDetails", upload.single("profile"), addDetails);

router.put("/updateDetails/:id", upload.single("profile"), updateDetails);

router.delete("/deleteDetails/:id", deleteDetails);

module.exports = router;

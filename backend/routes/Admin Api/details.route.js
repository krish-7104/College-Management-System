const express = require("express");
const router = express.Router();
const adminDetails = require("../../models/Admin/details.model.js");
const { getDetails, addDetails, updateDetails, deleteDetails } = require("../../controllers/Admin/details.controller.js");

router.post("/getDetails", getDetails);

router.post("/addDetails", addDetails);

router.put("/updateDetails/:id", updateDetails);

router.delete("/deleteDetails/:id", deleteDetails);

module.exports = router;

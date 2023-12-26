const express = require("express");
const router = express.Router();
const { getDetails, addDetails, updateDetails, deleteDetails, getCount } = require("../../controllers/Faculty/details.controller.js")

router.get("/getDetails", getDetails);

router.post("/addDetails", addDetails);

router.put("/updateDetails/:id", updateDetails);

router.delete("/deleteDetails/:id", deleteDetails);

router.get("/count", getCount);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addCredentialController,
  updateCredentialController,
  deleteCredentialController,
} = require("../controllers/credential.controller");

router.post("/:type", addCredentialController);
router.put("/:type/:id", updateCredentialController);
router.delete("/:type/:id", deleteCredentialController);

module.exports = router;

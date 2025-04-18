const express = require("express");
const router = express.Router();
const {
  getCredentials,
  addCredential,
  updateCredential,
  deleteCredential,
} = require("../controllers/credential.controller");

router.get("/:type", getCredentials);
router.post("/:type", addCredential);
router.put("/:type/:id", updateCredential);
router.delete("/:type/:id", deleteCredential);

module.exports = router;

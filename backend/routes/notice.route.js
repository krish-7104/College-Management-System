const express = require("express");
const {
  getNoticeController,
  addNoticeController,
  updateNoticeController,
  deleteNoticeController,
} = require("../controllers/notice.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", auth, getNoticeController);
router.post("/", auth, addNoticeController);
router.put("/:id", auth, updateNoticeController);
router.delete("/:id", auth, deleteNoticeController);

module.exports = router;

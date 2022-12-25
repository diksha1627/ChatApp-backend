const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/authMiddleware");
const {accessChat , fetchChats , createGroupChat , renameGroup , removeFromGroup , addtoGroup} = require("../../controllers/chatController");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addtoGroup); 
router.route("/groupremove").put(protect, removeFromGroup);

 
module.exports = router;

 



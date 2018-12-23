const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const ControlComment = require('@controllers/control-comments');

router.get("/", ControlComment.comment_get);
//router.get("/:commentId", ControlComment.comment_find);

router.post("/", checkAuth, checkAdmin, ControlComment.comment_create);
router.patch("/:commentId", checkAuth, checkAdmin, ControlComment.comment_update);
router.delete("/:commentId", checkAuth, checkAdmin, ControlComment.comment_delete);

module.exports = router;


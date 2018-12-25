const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const ControlComment = require('@controllers/control-comment');

router.get("/:commentId", ControlComment.comment_find);

//router.patch("/:commentId", checkAuth, checkAdmin, ControlComment.comment_update);
router.delete("/:commentId", checkAuth, checkAdmin, ControlComment.comment_delete);

router.post("/:commentId/like", checkAuth, ControlComment.comment_like);
router.delete("/:commentId/like", checkAuth, ControlComment.comment_unlike);

module.exports = router;


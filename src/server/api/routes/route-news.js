const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const NewsController = require('@controllers/control-news');

router.get("/", NewsController.news_get);
router.get("/top", NewsController.news_top);
router.get("/:newsId", NewsController.news_find);

router.post("/", checkAuth, checkAdmin, NewsController.news_create);
router.patch("/:newsId", checkAuth, checkAdmin, NewsController.news_update);
router.delete("/:newsId", checkAuth, checkAdmin, NewsController.news_delete);

router.get("/:newsId/comment", NewsController.news_get_comments);
router.post("/:newsId/comment", checkAuth, NewsController.news_create_comment);
router.delete("/:newsId/comment/:commentId", checkAuth, checkAdmin, NewsController.news_delete_comment);

module.exports = router;

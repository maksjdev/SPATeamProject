const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const NewsController = require('@controllers/control-news');

router.get("/", NewsController.news_get_all);
router.get("/:newsId", NewsController.get_news);

router.post("/", checkAdmin, NewsController.news_create);
router.patch("/:newsId",  checkAdmin, NewsController.update_news);
router.delete("/:newsId",  checkAdmin, NewsController.news_delete);

module.exports = router;

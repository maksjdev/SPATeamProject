const express = require("express");
const router = express.Router();


const NewsController = require('@controllers/control-news');
const checkAuth = require('@middleware/check-auth');


router.get("/", NewsController.news_get_all);

router.post("/", NewsController.news_create);

router.get("/:newsId", NewsController.get_news);

router.patch("/:newsId",  NewsController.update_news);

router.delete("/:newsId",  NewsController.news_delete);

module.exports = router;

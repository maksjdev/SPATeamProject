const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

const ModelNews = require("../models/model-news");

router.get("/", (req, res, next) => {
  ModelNews.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const news = new ModelNews({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    title: req.body.title,
    text: req.body.text
  });
  news.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        //message: "Handling POST requests to /news",
        createdNews: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;



const mongoose = require("mongoose");
const ControlNews = require("@models/model-news");

exports.news_get_all = (req, res, next) => {
  ControlNews.find({}).exec()
    .then(docs => {
      const response = {
        count: docs.length,
        news: docs.map(doc => {
          return {
            title: doc.title,
            image_url: doc.image_url,
            text: doc.text,
            date : doc.date,
            author: doc.author,
            categories : doc.categories,
            rating : doc.rating,
            comments_number : doc.comments_number,
            comments : doc.comments,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/news/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.news_create = (req, res, next) => {
  const news = new ControlNews({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    image_url: req.body.image_url,
    text: req.body.text,
    date : req.body.date,
    author: req.body.author,
    categories : req.body.categories,
    rating : req.body.rating,
    comments_number : req.body.comments_number,
    comments : req.body.comments
  });
  news
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_news = (req, res, next) => {
  const id = req.params.newsId;
  ControlNews.findById(id)
    .select("title image_url text date author categories rating comments_number comments _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      }
      else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update_news = (req, res, next) => {
  const id = req.params.newsId;
  const input = {}
  for (const key of Object.values(input)) {
    console.log(key, input[key]);
  }
 /* const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }*/
  ControlNews.update({ _id: id }, { $set: input })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ControlNews updated",
        result,
        request: {
          type: "GET",
          url: "http://localhost:3000/news/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.news_delete = (req, res, next) => {
  const id = req.params.newsId;
  ControlNews.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ControlNews deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/ControlNews",
          body: {
            title: "String",
            image_url: "String",
            text: "String",
            date : "Date",
            author: "String",
            categories : "String",
            rating : "Number",
            comments_number : "Number",
            comments : "String"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

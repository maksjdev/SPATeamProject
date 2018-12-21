const mongoose = require("mongoose");

const [ModelNews, createNews] = require("@models/model-news");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

exports.news_get_all = (req, res) => {
  // TODO: Тут будем забирать params
  // И уже после фильтровать по ним и после возвращать назад клиенту
  ModelNews.find({}).exec()
    .then(docs => {
      const response = {
        total_count: docs.length,
        /* TODO: Должны быть поля для:
            количества новостей которые вернули
            страницы на которой сейчас
            все активные фильтры (по которым я запросил поля в newsDataService)
        */
        news: docs.map(news => {
          let id = news._id, title = news.title, imageLink = news.image_url, text = news.text,
              createDate = news.create_date, author = news.author, categories = news.categories,
              rating = news.rating, commentNumber = news.comments_number, commentList = news.comments;
          return {
            _id: id,
            title: title,
            image_url: imageLink,
            text: text,
            date: createDate,
            author: author,
            categories: categories,
            rating: rating,
            comments_number : commentNumber,
            comments : commentList,
          };
        })
      };
      res.status(CODES.S_OK).json(response);
    })
    .catch(err => {
      res.status(CODES.ES_INTERNAL).json({
        error: err
      });
    });
};

exports.news_create = (req, res, next) => {
  // TODO: Вынести все в переменные и юзать ф-цию модели для создания
  const news = new createNews();
  news.save()
    .then(result => {
      console.log(result);
      // TODO: Заменить коды на константы и сообщения
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
  // TODO: Юзать let вместо const - моя больная прихоть
  ModelNews.findById(id)
  // TODO: Не возвращать коментарии только их количество
  // TODO: Сами же коментарии будут по news/:id/comments
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
  const input = {};
  // TODO: Тут я посмотрю завтра
  for (const key of Object.values(input)) {
    console.log(key, input[key]);
  }
 /* const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }*/
  ModelNews.update({ _id: id }, { $set: input })
    .exec()
    .then(result => {
      // TODO: Если успешно обновили воозвращать саму обновленную новость
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
  ModelNews.remove({ _id: id })
    .exec()
    .then(result => {
      // TODO: Если успешно удалили воозвращать только код + можно msg
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

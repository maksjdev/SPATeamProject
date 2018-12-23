const mongoose = require("mongoose");

const [ModelNews, createNews] = require("@models/model-news");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');
const NEWS_PER_PAGE = 5;

exports.news_get = (req, res) => {
  let page = req.query.page,
      period = req.query.period,
      search = req.query.search,
      min_rating = req.query.min_rating,
      categories_id = req.query.categories_id;

  if (page && (period || search || min_rating || categories_id)){
    let selectByPeriod = period? { create_date: {"$gte": getFromDate(period), "$lt": new Date()}} : {};

    ModelNews.find(selectByPeriod,'-__v').sort({ create_date : -1 })
      .populate({path: 'author', select: '_id realname nickname img_url email rating role'})
      .populate({path: 'categories', select: '_id name news_amount'}).exec()
      .then(result => {
        let filters = getObjWithFields([
          {name: 'period', value: period},
          {name: 'search', value: search},
          {name: 'min_rating', value: min_rating},
          {name: 'categories_id', value: categories_id},
        ]);

        let totalCount = result.length;
        let totalPages = Math.ceil(totalCount / NEWS_PER_PAGE),
            sendFrom = (page-1) * NEWS_PER_PAGE,
            sendTo = page * NEWS_PER_PAGE;

        let newsList = result.splice(sendFrom, sendTo),
            sendCount = newsList.length;

        let response = {
          filters: filters,
          amount: {
            total: totalCount,
            send: sendCount,
          },
          pagination: {
            total_page: totalPages,
            current_page: page,
            send_from: sendFrom,
            send_to: sendTo
          },
          news: newsList
        };
        res.status(CODES.S_OK).json(response);
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_create = (req, res) => {
  let authorId = req.body.author,
      title = req.body.title,
      text = req.body.text,
      imageUrl = req.body.image_url,
      categories = req.body.categories;
  // console.log(authorId, title, text, imageUrl, categories);
  if (authorId && title && text && imageUrl && categories) {
    let categoriesArr = categories.split(',');
    const news = createNews(authorId, title, text, imageUrl, categoriesArr);
    news.save()
      .then(result => {
        res.status(CODES.S_CREATE).json(result);
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  }
  else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_find = (req, res) => {
  let newsId = req.params.newsId;
  let getType = req.query.get_type;

  let fieldByType = {
    full: '_id author title text img_url categories rating create_date comments_number comments',
    medium: '_id author title text img_url categories rating create_date comments_number',
    small: '_id author title create_date rating comments_number'
  }, selectedFields = Object.keys(fieldByType).indexOf(getType) > -1? fieldByType[getType] : fieldByType['full'];

  if (newsId) {
    ModelNews.findOne({_id: newsId }).select(selectedFields)
      .populate({path: 'author', select: '_id realname nickname img_url email rating'})
      .populate({path: 'categories', select: '_id name news_amount'}).exec()
      .then( result => {
        if (result) {
          res.status(CODES.S_OK).json(result);
        }
        else res.status(CODES.EC_NOT_FOUND).json({
          message: MSGS.NOT_FOUND
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_delete = (req, res) => {
  let newsId = req.params.newsId;
  if (newsId) {
    ModelNews.deleteOne({_id: newsId }).exec()
      .then( result => {
        if (result.n === 1) {
          res.status(CODES.S_OK).json({
            message: `News [id:${newsId}] ${MSGS.DELETED}`
          });
        } else res.status(CODES.EC_NOT_FOUND).json({
          message: MSGS.NOT_FOUND
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_top = (req, res) => {
  let amount = req.query.amount;
  let getType = req.query.get_type;

  let fieldByType = {
    full: '_id author title text img_url categories rating create_date comments_number comments',
    medium: '_id author title text img_url categories rating create_date comments_number',
    small: '_id author title create_date rating comments_number'
  }, selectedFields = Object.keys(fieldByType).indexOf(getType) > -1? fieldByType[getType] : fieldByType['small'];

  ModelNews.find({ create_date: {"$gte": getFromDate('today'), "$lt": new Date() }})
    .sort({ rating : -1 }).select(selectedFields)
    .populate({path: 'author', select: '_id realname nickname img_url email rating'})
    .populate({path: 'categories', select: '_id name news_amount'}).exec()
    .then(result => {
      let total = result.length;
      let send = amount? amount > total? total : amount : total;
      let response = {
        amount_total: total,
        amount_send: send,
        news: result.splice(0, send)
      };
      res.status(CODES.S_OK).json(response);
    })
    .catch(err => {
      res.status(CODES.ES_INTERNAL).json({
        message: err
      });
    });
};


exports.news_update = (req, res) => {
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

exports.news_comment = (req, res) => {

};

function getFromDate(period) {
  let availablePeriod = {
    month: 30, week: 7, today: 1
  };
  if (Object.keys(availablePeriod).indexOf(period) < 0) { return getFromDate('week') }
  let today = new Date(), oneDay = 24*60*60*1000;
  return new Date(today.getTime() - availablePeriod[period]*oneDay);
}
function getObjWithFields(arr) {
  let resultObj = {};
  arr.forEach( item => resultObj[item.name] = item.value);
  return resultObj
}

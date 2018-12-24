const mongoose = require("mongoose");

const [ModelNews, createNews] = require("@models/model-news");
const [ModelComment, createComment] = require("@models/model-comment");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');
const NEWS_PER_PAGE = 2;

exports.news_get = (req, res) => {
  let page = req.query.page,
      period = req.query.period,
      search = req.query.search,
      min_rating = req.query.min_rating,
      categories_id = req.query.categories_id;

  if (page){
    let findfilter = {};
    if (period) { findfilter.create_date = {"$gte": getFromDate(period), "$lt": new Date()}; }
    if (min_rating && !isNaN(min_rating)) { findfilter.rating = {"$gte": parseInt(min_rating)}; }
    if (search) { findfilter.$text = { $search: search }; }
    if (categories_id && categories_id.split(',').length > 0) {
      findfilter.categories = { "$in" : categories_id.split(',') };
    }

    ModelNews.find(findfilter, '-__v').sort({ create_date : -1 })
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

        let newsList = result.slice(sendFrom, sendTo),
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
      })
      .catch(err => {
        console.log(err);
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
    });
  } else { res.status(CODES.EC_REQUEST).end() }
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

/*  Операции   */
exports.news_create = (req, res) => {
  let authorId = req.userData.userId,
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

exports.news_delete = (req, res) => {
  let newsId = req.params.newsId;
  if (newsId) {
    ModelNews.findByIdAndRemove(newsId, (err, result) => {
      if (result && !err) {
        res.status(CODES.S_OK).json({
          message: `News [id:${newsId}] ${MSGS.DELETED}`
        });
        // Удалить каскадом все связаные коментариии
        ModelComment.deleteMany({_id: {$in: result.comments} }).exec()
          .then(deleted => {
            // Успешно удалили!
          }).catch(err => { });
      } else res.status(CODES.EC_NOT_FOUND).json({
        message: MSGS.NOT_FOUND
      });
    })
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_update = (req, res) => {
  let newsId = req.params.newsId;
  let newTitle = req.body.title;
  let newText = req.body.text;
  let newImage = req.body.image_url;
  let newCategories = req.body.categories;

  if (newsId && (newTitle || newText || newImage || newCategories)) {
    let updateObj = {};
    if (newTitle) updateObj.title = newTitle;
    if (newText) updateObj.text = newText;
    if (newImage) updateObj.img_url = newImage;
    if (newCategories) {
      updateObj.categories = newCategories.split(',');
    }

    ModelNews.updateOne(
      {_id: newsId }, {$set: updateObj}, {}).exec()
      .then(result => {
        if (result.n === 1) {
          res.status(CODES.S_ACCEPT).json({
            message: `News [id:${newsId}] ${MSGS.UPDATED}`
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

/*  Сторонние   */
exports.news_get_comments = (req, res) => {
  let newsId = req.params.newsId;
  let getType = req.query.get_type;

  let getByType = {
    full: { path: 'comments', select: '-__v', populate: { path: 'author', select: '_id realname nickname img_url'}},
    normal: { path: 'comments', select: '-__v' },
  }, populate = Object.keys(getByType).indexOf(getType) > -1? getByType[getType] : getByType['normal'];

  if (newsId) {
    ModelNews.findOne({_id: newsId }).sort({ create_date : 1 }).select('comments')
      .populate(populate).then(comments => {
      if (comments) {
        res.status(CODES.S_OK).json(comments);
      }
      else res.status(CODES.EC_NOT_FOUND).json({
        message: MSGS.NOT_FOUND
      });
    })
    .catch(err => {
      console.log(err);
      res.status(CODES.ES_INTERNAL).json({
        message: err
      });
    });
  }
  else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_create_comment = (req, res) => {
  let newsId = req.params.newsId;
  let authorId = req.userData.userId;
  let text = req.body.text;

  if (newsId && authorId && text) {
    // Проверим есть ли вообще такая новость
    ModelNews.findOne({_id: newsId }).exec().then(news => {
      if (news){
        // Создали комент
        const comment = createComment(authorId, newsId, text);
        comment.save()
          .then( result => {
            // Нужно у новости увеличить количество коментариев и их список
            ModelNews.updateOne(
              {_id: newsId}, {$addToSet: { comments: result._id }, $inc: { comments_number: 1}}, {}).exec()
              .then(update => {
                if (update.n === 1) {
                  res.status(CODES.S_CREATE).json(result);
                } else res.status(CODES.EC_NOT_FOUND).json({
                  message: MSGS.NOT_FOUND
                });
              })
          })
          .catch(err => {
            res.status(CODES.EC_REQUEST).json({
              message: err
            });
          });
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
  }
  else { res.status(CODES.EC_REQUEST).end() }
};

exports.news_delete_comment = (req, res) => {
  let newsId = req.params.newsId;
  let commentId = req.params.commentId;

  if (newsId && commentId) {
    // Проверим есть ли вообще такой коментарий
    ModelComment.deleteOne({_id: commentId }).exec()
      .then( result => {
        if (result.n === 1) {
          res.status(CODES.S_OK).json({
            message: `Comment [id:${newsId}] ${MSGS.DELETED}`
          });
          ModelNews.updateOne(
            {_id: newsId}, { $pull: { comments: commentId }, $inc: { comments_number: -1}}, {}).exec()
            .then(update => {
              // Уменьшили количество комментариев
            }).catch(err => { });
        } else res.status(CODES.EC_NOT_FOUND).json({
          message: MSGS.NOT_FOUND
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  }
  else { res.status(CODES.EC_REQUEST).end() }
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

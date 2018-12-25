const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const [ModelUser, createUser] = require("@models/model-user");
const [ModelNews, createNews] = require("@models/model-news");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

exports.user_signup = (req, res, next) => {
  let emailV = req.body.email,
      realnameV = req.body.realname,
      nicknameV = req.body.nickname,
      passwordV = req.body.password,
      imgUrlV = req.body.img_url;
  if (emailV && realnameV && nicknameV && passwordV && imgUrlV){
    ModelUser.find({email: { $regex: new RegExp("^" + emailV.toLowerCase(), "i")}}).exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(CODES.EC_CONFLICT).json({
            message: MSGS.MAIL_EXIST
          });
        } else {
          bcrypt.hash(passwordV, 10, (err, hash) => {
            if (err) {
              return res.status(CODES.ES_INTERNAL).send(err);
            } else {
              const user = createUser(imgUrlV, realnameV, nicknameV, emailV, hash);
              user.save()
                .then(result => {
                  res.status(CODES.S_CREATE).json(result);
                })
                .catch(err => {
                  console.log(err);
                  res.status(CODES.ES_INTERNAL).json({
                    message: err
                  });
                });
            }
          });
        }
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};
exports.user_login = (req, res, next) => {
  let loginV = req.body.login,
      passwordV = req.body.password;
  if (loginV && passwordV){
    ModelUser.findOne({email: loginV})
      .select("_id password email").exec()
      .then(user => {
        if (!user) {
          res.status(CODES.EC_AUTH).json({
            message: MSGS.MAIL_NOT_EXIST
          });
        }
        let userPassword = user.password, userEmail = user.email, userId= user._id;
        bcrypt.compare(passwordV, userPassword, (err, result) => {
          if (result && !err) {
            const token = jwt.sign({
              email: userEmail,
              userId: userId
            }, ENV.JWT_KEY, {expiresIn: "1h"});

            return res.status(CODES.S_OK).json({
              message: MSGS.AUTH_SUCCES,
              token: token,
              userId: userId
            });
          }
          else if (!result && !err) {
            res.status(CODES.EC_AUTH).json({
              message: MSGS.PASS_WRONG
            });
          } else res.status(CODES.EC_AUTH).json({
            message: MSGS.AUTH_FAIL
          });
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end()}
};

exports.user_delete = (req, res) => {
  let userId = req.params.userId;
  if (userId) {
    ModelUser.deleteOne({_id: userId }).exec()
    .then( result => {
      if (result.n === 1) {
        res.status(CODES.S_OK).json({
          message: `User [id:${userId}] ${MSGS.DELETED}`
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
exports.user_find = (req, res) => {
  let userId = req.params.userId;
  if (userId) {
    ModelUser.findOne({_id: userId }, '-password -__v').exec()
      .then( result => {
        if (result) { res.status(CODES.S_OK).json(result); }
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

exports.user_bookmarks = (req, res) => {
  let userId = req.params.userId;
  if (userId) {
    ModelUser.findOne({_id: userId }).select('bookmarks')
      .populate({path: 'bookmarks', select: '-__v'}).exec()
      .then( result => {
        if (result) { res.status(CODES.S_OK).json(result); }
        else res.status(CODES.EC_REQUEST).json({
          message: MSGS.USER_NOT_FOUND
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};
exports.user_comments = (req, res) => {
  let userId = req.params.userId;
  if (userId) {
    ModelUser.findOne({_id: userId }).select('comments')
      .populate({path: 'comments', select: '-__v'}).exec()
      .then( result => {
        if (result) { res.status(CODES.S_OK).json(result); }
        else res.status(CODES.EC_REQUEST).json({
          message: MSGS.USER_NOT_FOUND
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.user_add_bookmark = (req, res) => {
  let userId = req.userData.userId;
  let newsId = req.params.newsId;
  if (userId && newsId) {
    ModelUser.findOne({_id: userId, bookmarks: newsId }).exec()
      .then( result => {
        // Если у пользователя еще нету такой закладки
        if (!result) {
          ModelUser.updateOne({_id: userId}, {$addToSet: {bookmarks: newsId} }, {}).exec()
            .then(result => {
              if (result.n === 1) {
                ModelNews.updateOne({_id: newsId }, { $inc: { rating: 1}}).exec()
                  .then(result => {
                    if (result.n === 1) {
                      res.status(CODES.S_ACCEPT).json({
                        message: `User [id:${userId}] ${MSGS.UPDATED}`
                      });
                    } else res.status(CODES.EC_NOT_FOUND).json({
                      message: MSGS.NOT_FOUND
                    });
                  })
              } else res.status(CODES.EC_NOT_FOUND).json({
                message: MSGS.NOT_FOUND
              });
            })
            .catch(err => {
              res.status(CODES.ES_INTERNAL).json({
                message: err
              });
            });
        } else {
          res.status(CODES.EC_CONFLICT).json({
            message: MSGS.YOU_HAVE
          });
        }
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};
exports.user_delete_bookmark = (req, res) => {
  let userId = req.userData.userId;
  let newsId = req.params.newsId;
  if (userId && newsId) {
    ModelUser.findOne({_id: userId, bookmarks: newsId }).exec()
      .then( result => {
        // Если у пользователя есть такая закладка
        if (result) {
          ModelUser.updateOne({_id: userId }, {$pull: {bookmarks: newsId} }, {}).exec()
            .then(result => {
              if (result.n === 1) {
                ModelNews.updateOne({_id: newsId }, {$inc: { rating: -1}}, {$min: { rating: 0 }} ).exec()
                  .then(result => {
                    if (result.n === 1) {
                      res.status(CODES.S_ACCEPT).json({
                        message: `User [id:${userId}] ${MSGS.UPDATED}`
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
              } else res.status(CODES.EC_NOT_FOUND).json({
                message: MSGS.NOT_FOUND
              });
            })
            .catch(err => {
              res.status(CODES.ES_INTERNAL).json({
                message: err
              });
            });
        } else {
          res.status(CODES.EC_CONFLICT).json({
            message: MSGS.YOU_DONT_HAVE
          });
        }
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const [ModelNews, createNews] = require("@models/model-news");
const [ModelComment, createComment] = require("@models/model-comment");
const [ModelUser, createUser] = require("@models/model-user");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');
const User = require("@models/model-user");

exports.comment_find = (req, res) => {
  let commentId = req.params.commentId;
  if (commentId) {
    ModelComment.findOne({_id: commentId }).select('-__v')
      .populate({path: 'author', select: '_id realname nickname img_url email rating'}).exec()
      .then( result => {
        if (result) {
          res.status(CODES.S_OK).json(result);
        }
        else res.status(CODES.EC_NOT_FOUND).json({
          message: MSGS.COMMENT_NOT_FOUND
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          message: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.comment_delete = (req, res) => {
  let commentId = req.params.commentId;

  if (commentId) {
    // Проверим есть ли вообще такой коментарий
    ModelComment.findByIdAndDelete(commentId).exec()
      .then( comment => {
        if (comment) {
          res.status(CODES.S_OK).json({
            message: `Comment [id:${comment._id}] ${MSGS.DELETED}`
          });
          ModelUser.updateOne({_id: comment.author}, {$pull: { comments: comment._id }}).exec();
          ModelNews.updateOne(
            {_id: comment.news}, { $pull: { comments: comment._id }, $inc: { comments_number: -1}}, {}).exec()
            .then(update => {
              // Уменьшили количество комментариев
            }).catch(err => { });
        } else res.status(CODES.EC_REQUEST).json({
          message: MSGS.COMMENT_NOT_FOUND
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

exports.comment_like = (req, res) => {
  let userId = req.userData.userId;
  let commentId = req.params.commentId;
  if (userId && commentId) {
    ModelUser.findOne({_id: userId, liked_comments: commentId }).exec()
      .then( user => {
        // Если пользователь еще не лайкал данный коммент
        if (!user) {
          ModelUser.updateOne({_id: userId}, {$addToSet: {liked_comments: commentId} }).exec()
            .then(updateUser => {
              if (updateUser.n === 1) {
                ModelComment.updateOne({_id: commentId }, { $inc: { rating: 1}}).exec()
                  .then(updateComment => {
                    if (updateComment.n === 1) {
                      res.status(CODES.S_ACCEPT).json({
                        message: `User [id:${userId}] liked comment [id:${commentId}]`
                      });
                    } else res.status(CODES.EC_NOT_FOUND).json({
                      message: MSGS.COMMENT_NOT_FOUND
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
            message: MSGS.YOU_LIKED
          });
        }
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.comment_unlike = (req, res) => {
  let userId = req.userData.userId;
  let commentId = req.params.commentId;
  if (userId && commentId) {
    ModelUser.findOne({_id: userId, liked_comments: commentId }).exec()
      .then( user => {
        // Если пользователь лайкал данный коммент
        if (user) {
          ModelUser.updateOne({_id: userId}, {$pull: {liked_comments: commentId} }).exec()
            .then(updateUser => {
              if (updateUser.n === 1) {
                ModelComment.updateOne({_id: commentId }, { $inc: { rating: -1}}).exec()
                  .then(updateComment => {
                    if (updateComment.n === 1) {
                      res.status(CODES.S_ACCEPT).json({
                        message: `User [id:${userId}] unliked comment [id:${commentId}]`
                      });
                    } else res.status(CODES.EC_NOT_FOUND).json({
                      message: MSGS.COMMENT_NOT_FOUND
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
            message: MSGS.YOU_UNLIKED
          });
        }
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

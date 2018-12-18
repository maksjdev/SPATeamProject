const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const ModelUser = require("@models/model-user");
const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');


exports.user_signup = (req, res, next) => {
  let emailV = req.body.email,
      realnameV = req.body.name,
      nicknameV = req.body.nickname,
      passwordV = req.body.password,
      imgUrlV = req.body.img_url;
  // console.log(emailV, realnameV, nicknameV, passwordV,imgUrlV);
  ModelUser.find({email: emailV}).exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(CODES.EC_CONFLICT).json({
          message: MSGS.MAIL_EXIST
        });
      }
      else {
        bcrypt.hash(passwordV, 10, (err, hash) => {
          if (err) {
            return res.status(CODES.ES_INTERNAL).json({
              error: err
            });
          }
          else {
            const user = new ModelUser({
              _id: new mongoose.Types.ObjectId(),
              img_url:  imgUrlV,
              name:     realnameV,
              nickname: nicknameV,
              email:    emailV,
              password: hash,
            });
            user.save()
              .then(result => {
                res.status(CODES.S_CREATE).json(result);
              })
              .catch(err => {
                console.log(err);
                res.status(CODES.ES_INTERNAL).json({
                  error: err
                });
              });
          }
        });
      }
    });
};
exports.user_login = (req, res, next) => {
  let emailV = req.body.email,
      passwordV = req.body.password;
  ModelUser.findOne({email: emailV }).exec()
    .then(user => {
      if (!user) {
        return res.status(CODES.EC_AUTH).json({
          message: MSGS.AUTH_FAIL
        });
      }
      bcrypt.compare(passwordV, user.password, (err, result) => {
        if (err) {
          return res.status(CODES.EC_AUTH).json({
            message: MSGS.AUTH_FAIL
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          }, ENV.JWT_KEY, {expiresIn: "1h"});
          return res.status(CODES.S_OK).json({
            message: MSGS.AUTH_SUCCES,
            token: token
          });
        }
        res.status(CODES.EC_AUTH).json({
          message: MSGS.AUTH_FAIL
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(CODES.ES_INTERNAL).json({
        error: err
      });
    });
};

exports.user_delete = (req, res) => {
  let userId = req.params.userId;
  ModelUser.deleteOne({_id: userId }).exec()
    .then( result => {
      res.status(CODES.S_OK).json({
        message: "User"+MSGS.DELETED
      });
    })
    .catch(err => {
      res.status(CODES.ES_INTERNAL).json({
        error: err
      });
    });
};
exports.user_find = (req, res) => {
  let userId = req.params.userId;
  ModelUser.findOne({_id: userId }).exec()
    .then( result => {
      res.status(CODES.S_OK).json(result);
    })
    .catch(err => {
      res.status(CODES.ES_INTERNAL).json({
        error: err
      });
    });
};

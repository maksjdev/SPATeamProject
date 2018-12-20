const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const [ModelUser, createUser] = require("@models/model-user");
const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');


exports.user_signup = (req, res, next) => {
  let emailV = req.body.email,
      realnameV = req.body.realname,
      nicknameV = req.body.nickname,
      passwordV = req.body.password,
      imgUrlV = req.body.img_url;
  // console.log(emailV, realnameV, nicknameV, passwordV,imgUrlV);
  if (emailV && realnameV && nicknameV && passwordV && imgUrlV){
    ModelUser.find({email: emailV}).exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(CODES.EC_CONFLICT).send(MSGS.MAIL_EXIST);
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
                    error: err
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
          res.status(CODES.EC_AUTH).send(MSGS.MAIL_NOT_EXIST);
        }
        let userPassword = user.password, userEmail = user.email, userId= user._id;
        bcrypt.compare(passwordV, userPassword, (err, result) => {
          if (err) {
            res.status(CODES.EC_AUTH).send(MSGS.AUTH_FAIL);
          }
          if (result) {
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
          res.status(CODES.EC_AUTH).send(MSGS.PASS_WRONG);
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          error: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end()}
};

exports.user_delete = (req, res) => {
  let userId = req.params.userId;
  if (userId) {
    ModelUser.deleteOne({_id: userId }).exec()
    .then( result => {
      res.status(CODES.S_OK).send("User"+MSGS.DELETED);
    })
    .catch(err => {
      res.status(CODES.ES_INTERNAL).json({
        error: err
      });
    });
  } else { res.status(CODES.EC_REQUEST).end() }
};
exports.user_find = (req, res) => {
  let userId = req.params.userId;
  if (userId) {
    ModelUser.findOne({_id: userId }, '-password -__v').exec()
      .then( result => {
        if (result) {
          res.status(CODES.S_OK).json(result)
        } else { throw Error('Shit happends'); }
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          error: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

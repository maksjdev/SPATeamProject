const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const [ModelCategory, createCategory] = require("@models/model-category");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');


exports.category_get = (req, res, next) => {
  let amount = req.query.amount;
  ModelCategory.find().sort({ news_amount : -1 }).exec()
    .then(result => {
      let total = result.length;
      let send = amount? amount > total? total : amount : total;
      let response = {
        amount_total: total,
        amount_send: send,
        categories: result.splice(0, send)
      };
      res.status(CODES.S_OK).json(response);
    });
};

exports.category_create = (req, res) => {
  let nameV = req.body.name;
  if (nameV) {
    ModelCategory.find({name: { $regex: new RegExp("^" + nameV.toLowerCase(), "i")} }).exec()
      .then(category => {
        if (category.length >= 1) {
          res.status(CODES.EC_CONFLICT).json({
            message: MSGS.CATEGORY_EXIST
          });
        } else {
          const category = createCategory(nameV);
          category.save()
            .then(result => {
              res.status(CODES.S_CREATE).json(result);
            })
            .catch(err => {
              res.status(CODES.ES_INTERNAL).json({
                message: err
              });
            });
        }
      });
  }
  else { res.status(CODES.EC_REQUEST).end() }
};

exports.category_find = (req, res) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    ModelCategory.findOne({_id: categoryId }, '-__v').exec()
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

exports.category_delete = (req, res) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    ModelCategory.deleteOne({_id: categoryId }).exec()
      .then( result => {
        if (result.n === 1) {
          res.status(CODES.S_OK).json({
            message: `Category [id:${categoryId}] ${MSGS.DELETED}`
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

exports.category_update = (req, res) => {
  let categoryId = req.params.categoryId;
  let newName = req.body.name;
  if (categoryId && newName && newName.length > 0) {
    ModelCategory.updateOne(
      {_id: categoryId }, {$set: { "name" : newName }, $inc: { "news_amount" : 1}}, {}).exec()
      .then(result => {
        if (result.n === 1) {
          res.status(CODES.S_ACCEPT).json({
            message: `Category [id:${categoryId}] ${MSGS.UPDATED}`
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

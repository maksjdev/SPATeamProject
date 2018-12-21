const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const [ModelCategory, createCategory] = require("@models/model-category");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');


exports.category_get_all = (req, res, next) => {
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
          return res.status(CODES.EC_CONFLICT).json({
            message: MSGS.CATEGORY_EXIST
          });
        } else {
          const category = createCategory(nameV);
          category.save()
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
  else { res.status(CODES.EC_REQUEST).end() }
};

exports.category_delete = (req, res) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    ModelCategory.deleteOne({_id: categoryId }).exec()
      .then( result => {
        res.status(CODES.S_OK).json({
          message: `Category [id:${result._id}, name: ${result.name}] ${MSGS.DELETED}`
        });
      })
      .catch(err => {
        res.status(CODES.ES_INTERNAL).json({
          error: err
        });
      });
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.category_update = (req, res) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    res.end();
  } else { res.status(CODES.EC_REQUEST).end() }
};

exports.category_find = (req, res) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    ModelCategory.findOne({_id: categoryId }, '-__v').exec()
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
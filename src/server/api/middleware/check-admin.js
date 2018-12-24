const jwt = require('jsonwebtoken');

const [ModelUser, createUser] = require("@models/model-user");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

module.exports = (req, res, next) => {
  let user = req.userData;

  let id = user.userId;
  ModelUser.findOne({_id: id}).select('role').exec().then((result) => {
    if (result.role !== 'Admin') {
      throw Error(MSGS.ACCESS_FORBIDDEN);
    }
    next();
  }).catch(error => {
    res.status(CODES.EC_FORBIDDEN).json({
      message: MSGS.ACCESS_FORBIDDEN
    });
  });
};

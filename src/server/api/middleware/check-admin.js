const jwt = require('jsonwebtoken');

const [ModelUser, createUser] = require("@models/model-user");

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, ENV.JWT_KEY);

    let id = decoded.userId;
    ModelUser.findOne({_id: id}).select('role').exec().then((result) => {
      console.log(result.role);
      if (result.role !== 'Admin'){
        throw Error(MSGS.ACCESS_FORBIDDEN);
      }
      req.userData = decoded;
      next();
    }).catch(error => {
      res.status(CODES.EC_FORBIDDEN).json({
        message: MSGS.ACCESS_FORBIDDEN
      });
    });
};

const jwt = require('jsonwebtoken');
const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")['JWT'];
    const decoded = jwt.verify(token, ENV.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(CODES.EC_AUTH).json({
      message: MSGS.AUTH_FAIL
    });
  }
};

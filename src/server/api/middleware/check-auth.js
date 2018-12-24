const jwt = require('jsonwebtoken');

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || token.length < 10) {
      res.status(CODES.EC_AUTH).json({
        message: MSGS.AUTH_FAIL
      });
    }

    req.userData = jwt.verify(token, ENV.JWT_KEY);
    next();
  } catch (error) {
    res.status(CODES.EC_AUTH).json({
      message: MSGS.AUTH_FAIL
    });
  }
};

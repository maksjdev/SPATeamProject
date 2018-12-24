const express = require("express");
const router = express.Router();

const CONFIG = require('@constants/config');
const CODES = require('@constants/http-codes');

router.get("/", (req, res) => {
  try {
    let congifData = CONFIG || {};
    res.status(CODES.S_OK).json(congifData);
  } catch (error) {
    res.status(CODES.EC_NOT_FOUND).json({
      message: MSGS.NOT_FOUND
    });
  }
});

module.exports = router;

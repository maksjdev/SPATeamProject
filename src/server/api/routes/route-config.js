const express = require("express");
const router = express.Router();

const CONFIG = require('@constants/config');
const CODES = require('@constants/http-codes');

router.get("/", (req, res) => {
  let congifData = CONFIG || {};
  res.status(CODES.S_OK).json(congifData);
});

module.exports = router;

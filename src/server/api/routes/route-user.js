const express = require("express");
const router = express.Router();

const ControlUser = require('../controllers/control-user');

router.post("/signup", ControlUser.user_signup);
router.post("/login", ControlUser.user_login);

router.get("/:userId",  ControlUser.user_find);
router.delete("/:userId",  ControlUser.user_delete);

module.exports = router;


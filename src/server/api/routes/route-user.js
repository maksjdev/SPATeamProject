const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const ControlUser = require('@controllers/control-user');

router.post("/registration", ControlUser.user_signup);
router.post("/login", ControlUser.user_login);

router.get("/:userId", ControlUser.user_find);
router.delete("/:userId", checkAuth, checkAdmin, ControlUser.user_delete);

module.exports = router;


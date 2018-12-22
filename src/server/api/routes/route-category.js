const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const ControlCategory = require('@controllers/control-category');

router.get("/", ControlCategory.category_get_all);
router.get("/:categoryId", ControlCategory.category_find);

router.post("/", checkAuth, checkAdmin, ControlCategory.category_create);
router.patch("/:categoryId", checkAuth, checkAdmin, ControlCategory.category_update);
router.delete("/:categoryId", checkAuth, checkAdmin, ControlCategory.category_delete);

module.exports = router;


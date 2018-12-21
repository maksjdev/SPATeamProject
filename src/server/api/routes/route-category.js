const express = require("express");
const router = express.Router();

const checkAdmin = require('@middleware/check-admin');
const ControlCategory = require('@controllers/control-category');

router.get("/", ControlCategory.category_get_all);
router.get("/:categoryId", ControlCategory.category_find);

router.post("/", ControlCategory.category_create);
router.patch("/:categoryId",  checkAdmin, ControlCategory.category_update);
router.delete("/:categoryId",  checkAdmin, ControlCategory.category_delete);

module.exports = router;


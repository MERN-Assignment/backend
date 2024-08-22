const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.post("/check-or-create", categoryController.createCategoryIfNotExist);

module.exports = router;

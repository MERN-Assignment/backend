const express = require("express");
const router = express.Router();
const customerController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);

module.exports = router;

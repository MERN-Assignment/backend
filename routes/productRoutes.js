const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post("/", productController.createOrUpdateProduct);
router.post("/add-sellingprice-date", productController.createInventory);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/update-inventory/:id", productController.updateInventory);
router.get(
  "/check/:productName/:quantity",
  productController.checkProductAvailability
);

module.exports = router;

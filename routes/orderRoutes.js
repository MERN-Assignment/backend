const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/:id/details", orderController.getOrderWithDetails);
router.post("/with-details", orderController.createOrderWithDetails);

module.exports = router;

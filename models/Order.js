const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetail",
    },
  ],
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;

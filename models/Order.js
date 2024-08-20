const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  customer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Ensure that this references the correct model
    required: true,
  },
  orderDetails: [
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;

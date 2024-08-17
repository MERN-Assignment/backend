const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema);
module.exports = OrderDetailModel;

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true,
  },
  sellingPrice: {
    type: Number,
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
  categoryName: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema, "product");
module.exports = ProductModel;

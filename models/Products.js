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
  date: {
    type: Date,
    required: true,
  },
  categoryID: {
    type: String,
    ref: "Category", 
    required: true,
  },
});



const ProductModel = mongoose.model("Product", ProductSchema, "product");
module.exports = ProductModel;

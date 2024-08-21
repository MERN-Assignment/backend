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
  categoryID: {
    type: String,
    ref: "Category", // Ensure that this references the correct model
    required: true,
  },
});

// ProductSchema.pre("save", async function (next) {
//   const category = await mongoose.model("Category").findById(this.categoryID);
//   if (!category) {
//     return next(new Error("Invalid category ID"));
//   }
//   next();
// });

const ProductModel = mongoose.model("Product", ProductSchema, "product");
module.exports = ProductModel;

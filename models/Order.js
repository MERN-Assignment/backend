const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  categoryID: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: {
    type: Date,
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryID: {
      type: String,
      required: true,
      unique: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const CategoryModel = mongoose.model("Category", CategorySchema, "category");
module.exports = CategoryModel;

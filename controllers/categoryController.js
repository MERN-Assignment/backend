const CategoryModel = require("../models/Category");

exports.getAllCategories = (req, res) => {
  CategoryModel.find({})
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer", details: err });
  }
};

exports.createCategoryIfNotExist = async (req, res) => {
  try {
    const { categoryID, categoryName } = req.body;

    // Check if the category already exists
    const existingCategory = await CategoryModel.findOne({
      categoryID,
      categoryName,
    });

    if (existingCategory) {
      // If the category exists, return a message or status
      return res
        .status(200)
        .json({
          message: "Category already exists",
          category: existingCategory,
        });
    }

    // If the category does not exist, create it
    const newCategory = new CategoryModel({ categoryID, categoryName });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create or check category", details: err });
  }
};

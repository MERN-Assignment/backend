const ProductModel = require("../models/Products");
const CategoryModel = require("../models/Category");

exports.getAllProducts = (req, res) => {
  ProductModel.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// controllers/productController.js
exports.createProduct = (req, res) => {
  const { productName, sellingPrice, quantity, categoryID } = req.body;

  // Create a new product instance
  const newProduct = new ProductModel({
    productName,
    sellingPrice,
    quantity,
    categoryID,
  });

  // Save the product to the database
  newProduct
    .save()
    .then((product) => res.status(201).json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
};

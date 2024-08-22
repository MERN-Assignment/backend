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

exports.createOrUpdateProduct = (req, res) => {
  const { productID, productName, quantity, categoryID } = req.body;

  // Use findOneAndUpdate to update if product exists, or create a new one if it doesn't
  ProductModel.findOneAndUpdate(
    { productID: productID }, // Query to find the existing product by productID
    {
      productName: productName,
      quantity: quantity,
      categoryID: categoryID,
    },
    { new: true, upsert: true } // Create a new product if not found, and return the updated/new document
  )
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
};

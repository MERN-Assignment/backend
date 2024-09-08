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
  const currentDate = new Date();

  // Use findOneAndUpdate to update if product exists, or create a new one if it doesn't
  ProductModel.findOneAndUpdate(
    { productID: productID }, // Query to find the existing product by productID
    {
      productName: productName,
      quantity: quantity,
      categoryID: categoryID,
      date: currentDate,
    },
    { new: true, upsert: true } // Create a new product if not found, and return the updated/new document
  )
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  ProductModel.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch product", details: err });
    });
};

exports.getProductByCustomID = (req, res) => {
  const customID = req.params.customID;
  ProductModel.findOne({ productID: customID })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch product", details: err });
    });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { productID, productName, quantity } = req.body;

  const updatedProduct = {
    ...(productID && { productID }),
    ...(productName && { productName }),
    ...(quantity && { quantity }),
  };

  ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true })
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).json({ error: "Failed to update product", details: err })
    );
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully", deletedProduct });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.createInventory = (req, res) => {
  const { productID, sellingPrice, date, quantity } = req.body;
ProductModel.findOneAndUpdate(
  { productID: productID },
  { sellingPrice, date, quantity },  // Add quantity here
  { new: true }
)

    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Failed to update product", details: err.message });
    });
};

exports.updateInventory = (req, res) => {
  const id = req.params.id;
  const { productID, productName, quantity, sellingPrice } = req.body;

  const updatedProduct = {
    ...(productID && { productID }),
    ...(productName && { productName }),
    ...(quantity && { quantity }),
    ...(sellingPrice && { sellingPrice }),
  };

  ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true })
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).json({ error: "Failed to update product", details: err })
    );
};

exports.checkProductAvailability = async (req, res) => {
  const { productName, quantity } = req.params;

  try {
    const product = await ProductModel.findOne({ productName: productName });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    res.json({
      price: product.sellingPrice,
      availableQuantity: product.quantity,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error checking product availability", err });
  }
};

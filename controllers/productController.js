const ProductModel = require("../models/Products");
const CategoryModel = require("../models/Category");

exports.getAllProducts = (req, res) => {
  ProductModel.find({})
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.createProduct = async (req, res) => {
  try {
    const {
      productID,
      productName,
      categoryID,
      categoryName,
      quantity,
      sellingPrice,
    } = req.body;

    // Create or update the category
    let category = await CategoryModel.findOne({ categoryID });
    if (!category) {
      category = new CategoryModel({ categoryID, categoryName });
    } else {
      category.categoryName = categoryName;
    }
    await category.save();

    // Create the product
    const product = new ProductModel({
      productID,
      productName,
      categoryID,
      categoryName,
      quantity,
      sellingPrice,
    });
    await product.save();

    res.status(201).json({ product, category });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create product and category", details: err });
  }
};

// exports.getProductById = (req, res) => {
//   const id = req.params.id;
//   CustomerModel.findById(id)
//     .then((customer) => {
//       if (!customer) {
//         return res.status(404).json({ message: "Customer not found" });
//       }
//       res.json(customer);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to fetch customer", details: err });
//     });
// };

// // This function fetches a customer by the custom customerID string
// exports.getCustomerByCustomID = (req, res) => {
//   const customID = req.params.customID;
//   CustomerModel.findOne({ customerID: customID })
//     .then((customer) => {
//       if (!customer) {
//         return res.status(404).json({ message: "Customer not found" });
//       }
//       res.json(customer);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to fetch customer", details: err });
//     });
// };

// exports.updateProduct = (req, res) => {
//   const id = req.params.id;
//   const updatedCustomer = req.body;

//   CustomerModel.findByIdAndUpdate(id, updatedCustomer, { new: true })
//     .then((result) => res.json(result))
//     .catch((err) =>
//       res.status(500).json({ error: "Failed to update customer", details: err })
//     );
// };

// exports.deleteProduct = (req, res) => {
//   const id = req.params.id;
//   CustomerModel.findByIdAndDelete(id)
//     .then((deletedCustomer) => {
//       if (!deletedCustomer) {
//         return res.status(404).json({ message: "Customer not found" });
//       }
//       res.json({ message: "Customer deleted successfully", deletedCustomer });
//     })
//     .catch((err) => res.status(500).json({ error: err.message }));
// };

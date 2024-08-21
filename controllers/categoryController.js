const ProductModel = require("../models/Products");

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
    const product = req.body;
    const newProduct = new ProductModel(product);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer", details: err });
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

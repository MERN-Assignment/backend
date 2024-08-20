const CustomerModel = require("../models/Customers");

exports.getAllCustomers = (req, res) => {
  CustomerModel.find({})
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const newCustomer = new CustomerModel(customer);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer", details: err });
  }
};

exports.getCustomerById = (req, res) => {
  const id = req.params.id;
  CustomerModel.findById(id)
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(customer);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch customer", details: err });
    });
};

// This function fetches a customer by the custom customerID string
exports.getCustomerByCustomID = (req, res) => {
  const customID = req.params.customID;
  CustomerModel.findOne({ customerID: customID })
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(customer);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch customer", details: err });
    });
};

exports.updateCustomer = (req, res) => {
  const id = req.params.id;
  const updatedCustomer = req.body;

  CustomerModel.findByIdAndUpdate(id, updatedCustomer, { new: true })
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).json({ error: "Failed to update customer", details: err })
    );
};

exports.deleteCustomer = (req, res) => {
  const id = req.params.id;
  CustomerModel.findByIdAndDelete(id)
    .then((deletedCustomer) => {
      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json({ message: "Customer deleted successfully", deletedCustomer });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

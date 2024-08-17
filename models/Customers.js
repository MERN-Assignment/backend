const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customer_ID: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact_number: {
    type: Number,
    required: true,
  },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema, "customer"); // Specify the exact collection name here
module.exports = CustomerModel;

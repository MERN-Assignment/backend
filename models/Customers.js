const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
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

const CustomerModel = mongoose.model("Customer", CustomerSchema, "customer");
module.exports = CustomerModel;

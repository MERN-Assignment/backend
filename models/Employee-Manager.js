const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


const EmployeeManagerModel = mongoose.model('EmployeeManager', employeeManagerSchema, 'Authentications');

module.exports = EmployeeManagerModel;
// Compare this snippet from backend/models/Employee-Manager.js:
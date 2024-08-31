const EmployeeModel = require('../models/Employee-Manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new employee
exports.createEmployee = async (req, res) => {

  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
    const newEmployee = new EmployeeModel({ username, password: hashedPassword });
    await newEmployee.save();
    res.status(201).json({
      status: 'success',
      message: 'Employee created successfully',
      data: { employee: newEmployee }
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to create employee',
      details: error.message
    });
  }
};

// Verify employee login
exports.verifyEmployee = async (req, res) => {
  console.log('Verifying employee...');
  const { username, password } = req.body;
  console.log('Received username:', username);
  console.log('Received password:', password);
  try {
    const user = await EmployeeModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User does not exist'
      });
    }

    console.log('User found:', user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid password'
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      details: error.message
    });
  }
};

// Fetch all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    res.status(200).json({
      status: 'success',
      data: employees
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch employees',
      details: err.message
    });
  }
};

// Fetch employee by ID
exports.getEmployeeById = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({
        status: 'fail',
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: employee
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch employee',
      details: err.message
    });
  }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
  const id = req.params.id;
  const updatedEmployee = req.body;
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true });
    if (!employee) {
      return res.status(404).json({
        status: 'fail',
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: employee
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to update employee',
      details: err.message
    });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({
        status: 'fail',
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully',
      data: deletedEmployee
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to delete employee',
      details: err.message
    });
  }
};

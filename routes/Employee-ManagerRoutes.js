const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../models/middleware/authMiddleware');

// Route to get all employees (protected)
router.get('/', authMiddleware, authController.getAllEmployees);

// Route to create a new employee
router.post('/', authController.createEmployee);

// Route to verify employee login
router.post('/verify', authController.verifyEmployee);

// Route to get a specific employee by ID (protected)
router.get('/:id', authMiddleware, authController.getEmployeeById);

// Route to update an existing employee by ID (protected)
router.put('/:id', authMiddleware, authController.updateEmployee);

// Route to delete an employee by ID (protected)
router.delete('/:id', authMiddleware, authController.deleteEmployee);

module.exports = router;
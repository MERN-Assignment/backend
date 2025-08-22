# TechSL Inventory Management System - Backend

This repository contains the backend implementation of the TechSL Inventory Management System, developed as part of a **Rapid Application Development (RAD)** group assignment using the **MERN stack**.

## 📋 Project Overview

TechSL is a comprehensive inventory management system designed to help businesses manage their products, customers, orders, and employee access efficiently. This backend provides a robust REST API that handles authentication, inventory tracking, order processing, and customer management.

### Key Features

- **🔐 Authentication & Authorization**: JWT-based authentication system for employees and managers
- **📦 Product Management**: Complete CRUD operations for inventory items with category organization
- **👥 Customer Management**: Customer data management and tracking
- **📊 Order Management**: Order processing with detailed order tracking
- **🏷️ Category Management**: Product categorization system
- **🔒 Secure API**: Protected routes with middleware authentication
- **📱 CORS Enabled**: Ready for frontend integration

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv
- **Development**: nodemon for hot reloading
- **Cross-Origin**: CORS enabled for frontend communication

## 📁 Project Structure

```
backend/
├── controllers/           # Business logic controllers
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product management
│   ├── customerController.js # Customer management
│   ├── orderController.js    # Order processing
│   └── categoryController.js # Category management
├── models/               # MongoDB data models
│   ├── Employee-Manager.js   # User authentication model
│   ├── Products.js          # Product inventory model
│   ├── Customers.js         # Customer data model
│   ├── Order.js            # Order management model
│   ├── Category.js         # Product category model
│   └── middleware/         # Custom middleware
│       └── authMiddleware.js # JWT authentication middleware
├── routes/               # API route definitions
│   ├── Employee-ManagerRoutes.js # Authentication routes
│   ├── productRoutes.js         # Product API routes
│   ├── customerRoutes.js        # Customer API routes
│   ├── orderRoutes.js          # Order API routes
│   └── categoryRoutes.js       # Category API routes
├── index.js              # Main application entry point
├── package.json          # Project dependencies and scripts
└── .env                  # Environment variables (not in repo)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MERN-Assignment/backend.git
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001` (or your specified PORT).

## 🔌 API Endpoints

### Authentication (`/api/employees`)
- `GET /` - Get all employees (protected)
- `POST /` - Create new employee
- `POST /verify` - Employee login verification
- `GET /:id` - Get employee by ID (protected)
- `PUT /:id` - Update employee (protected)
- `DELETE /:id` - Delete employee (protected)

### Products (`/api/products`)
- `GET /` - Get all products
- `POST /` - Create or update product
- `POST /add-sellingprice-date` - Create inventory entry
- `GET /:id` - Get product by ID
- `PUT /:id` - Update product
- `DELETE /:id` - Delete product
- `PUT /update-inventory/:id` - Update product inventory
- `GET /check/:productName/:quantity` - Check product availability

### Customers (`/api/customers`)
- `GET /` - Get all customers
- `POST /` - Create new customer
- `GET /:id` - Get customer by ID
- `PUT /:id` - Update customer
- `DELETE /:id` - Delete customer
- `GET /by-customID/:customID` - Get customer by custom ID

### Orders (`/api/orders`)
- `GET /` - Get all orders
- `POST /` - Create new order
- `GET /:id` - Get order by ID
- `PUT /:id` - Update order
- `DELETE /:id` - Delete order
- `GET /:id/details` - Get order with details
- `POST /with-details` - Create order with details

### Categories (`/api/categories`)
- Standard CRUD operations for product categories

## 🔐 Authentication Flow

1. **Employee Registration**: Create account via `POST /api/employees`
2. **Login**: Authenticate via `POST /api/employees/verify`
3. **Token Usage**: Include JWT token in Authorization header: `Bearer <token>`
4. **Protected Routes**: Most routes require valid JWT token

### Example Authentication
```javascript
// Login
POST /api/employees/verify
{
  "username": "employee_username",
  "password": "employee_password"
}

// Response
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Using token in subsequent requests
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 💾 Database Models

### Employee-Manager
- `username`: Unique employee identifier
- `password`: Hashed password for authentication

### Product
- `productID`: Unique product identifier
- `productName`: Product name
- `sellingPrice`: Current selling price
- `quantity`: Available stock quantity
- `date`: Date of inventory entry
- `categoryID`: Reference to product category

### Customer
- `customer_ID`: Unique customer identifier
- `fName`: First name
- `lName`: Last name
- `email`: Customer email address
- `address`: Customer address
- `contact_number`: Contact phone number

### Order
- `orderID`: Unique order identifier
- `orderDate`: Date of order creation
- `totalPrice`: Total order amount
- `customer_ID`: Reference to customer
- `orderDetails`: Array of order items with product details

### Category
- `categoryID`: Unique category identifier
- `categoryName`: Category name

## 🔧 Development

### Scripts
- `npm start` - Start development server with nodemon
- `npm test` - Run tests (currently not configured)

### Code Style
The project follows standard JavaScript conventions with:
- Consistent async/await usage
- Proper error handling with try-catch blocks
- RESTful API design principles
- Modular architecture with separation of concerns

## 🚀 Deployment

This backend is designed to be deployed with the corresponding frontend React application to complete the full-stack TechSL inventory management system.

### Environment Variables for Production
Ensure the following environment variables are set in your production environment:
- `MONGODB_URI`: Production MongoDB connection string
- `PORT`: Server port (defaults to 3001)
- `JWT_SECRET`: Strong secret key for JWT signing

## 🤝 Contributing

This project was developed as part of a Rapid Application Development group assignment. The MERN stack implementation demonstrates modern web development practices for inventory management systems.

## 📝 License

This project is part of an academic assignment for TechSL inventory management system development.

---

**Note**: This is the backend repository only. The complete MERN stack application requires the corresponding React frontend for full functionality.
const express = require('express');
const propertyRoute = express.Router();
const propertyController = require('../controllers/propertyController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Add a new property
propertyRoute.post('/', isAuthenticated, propertyController.addProperty);

// Get all properties
propertyRoute.get('/', isAuthenticated, propertyController.getAllProperties);

// Get property by ID
propertyRoute.get('/:id', isAuthenticated, propertyController.getPropertyById);

module.exports = propertyRoute;
const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Add a new tenant
router.post('/', isAuthenticated, tenantController.addTenant);

// Get all tenants
router.get('/', isAuthenticated, tenantController.getAllTenants);

// Get tenant by ID
router.get('/:id', isAuthenticated, tenantController.getTenantById);

module.exports = router;
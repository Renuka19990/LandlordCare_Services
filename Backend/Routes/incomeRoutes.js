const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Add new income
router.post('/', isAuthenticated, incomeController.addIncome);

// Get all incomes
router.get('/', isAuthenticated, incomeController.getAllIncomes);

// Get income by ID
router.get('/:id', isAuthenticated, incomeController.getIncomeById);

module.exports = router;
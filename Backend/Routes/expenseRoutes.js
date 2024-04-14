const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Add a new expense
router.post('/', isAuthenticated, expenseController.addExpense);

// Get all expenses
router.get('/', isAuthenticated, expenseController.getAllExpenses);

// Get expense by ID
router.get('/:id', isAuthenticated, expenseController.getExpenseById);

module.exports = router;
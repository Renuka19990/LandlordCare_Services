const db = require('../config/dbConfig');

// Add a new expense
const addExpense = (req, res) => {
  const { description, amount, propertyId } = req.body;
  const property = db.properties.find(prop => prop.id === parseInt(propertyId));
  if (!property) {
    return res.status(404).json({ message: 'Property not found.' });
  }
  const newExpense = { id: db.expenses.length + 1, description, amount, propertyId };
  db.expenses.push(newExpense);
  res.status(201).json({ message: 'Expense added successfully.', expense: newExpense });
};

// Get all expenses
const getAllExpenses = (req, res) => {
  res.status(200).json({ expenses: db.expenses });
};

// Get expense by ID
const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = db.expenses.find(expense => expense.id === parseInt(id));
  if (!expense) {
    return res.status(404).json({ message: 'Expense not found.' });
  }
  res.status(200).json({ expense });
};

module.exports = {
  addExpense,
  getAllExpenses,
  getExpenseById,
};

const db = require('../config/dbConfig');

// Add new income
const addIncome = (req, res) => {
  const { description, amount, propertyId } = req.body;
  const property = db.properties.find(prop => prop.id === parseInt(propertyId));
  if (!property) {
    return res.status(404).json({ message: 'Property not found.' });
  }
  const newIncome = { id: db.incomes.length + 1, description, amount, propertyId };
  db.incomes.push(newIncome);
  res.status(201).json({ message: 'Income added successfully.', income: newIncome });
};

// Get all incomes
const getAllIncomes = (req, res) => {
  res.status(200).json({ incomes: db.incomes });
};

// Get income by ID
const getIncomeById = (req, res) => {
  const { id } = req.params;
  const income = db.incomes.find(income => income.id === parseInt(id));
  if (!income) {
    return res.status(404).json({ message: 'Income not found.' });
  }
  res.status(200).json({ income });
};

module.exports = {
  addIncome,
  getAllIncomes,
  getIncomeById,
};
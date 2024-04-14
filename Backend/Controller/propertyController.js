const db = require('../config/dbConfig');

// Add a new property
const addProperty = (req, res) => {
  const { name, address, rentAmount, isVacant } = req.body;
  const newProperty = { id: db.properties.length + 1, name, address, rentAmount, isVacant };
  db.properties.push(newProperty);
  res.status(201).json({ message: 'Property added successfully.', property: newProperty });
};

// Get all properties
const getAllProperties = (req, res) => {
  res.status(200).json({ properties: db.properties });
};

// Get property by ID
const getPropertyById = (req, res) => {
  const { id } = req.params;
  const property = db.properties.find(prop => prop.id === parseInt(id));
  if (!property) {
    return res.status(404).json({ message: 'Property not found.' });
  }
  res.status(200).json({ property });
};

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
};
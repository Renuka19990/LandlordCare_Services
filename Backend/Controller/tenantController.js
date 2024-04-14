const db = require('../config/dbConfig');

// Add a new tenant
const addTenant = (req, res) => {
  const { name, email, phone, propertyId } = req.body;
  const property = db.properties.find(prop => prop.id === parseInt(propertyId));
  if (!property) {
    return res.status(404).json({ message: 'Property not found.' });
  }
  const newTenant = { id: db.tenants.length + 1, name, email, phone, propertyId };
  db.tenants.push(newTenant);
  res.status(201).json({ message: 'Tenant added successfully.', tenant: newTenant });
};

// Get all tenants
const getAllTenants = (req, res) => {
  res.status(200).json({ tenants: db.tenants });
};

// Get tenant by ID
const getTenantById = (req, res) => {
  const { id } = req.params;
  const tenant = db.tenants.find(tenant => tenant.id === parseInt(id));
  if (!tenant) {
    return res.status(404).json({ message: 'Tenant not found.' });
  }
  res.status(200).json({ tenant });
};

module.exports = {
  addTenant,
  getAllTenants,
  getTenantById,
};
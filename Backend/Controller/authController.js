const db = require('../config/dbConfig');

// Register a new user
const register = (req, res) => {
  const { username, email, password } = req.body;
  // Check if user already exists
  const existingUser = db.users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }
  // Create new user
  const newUser = { id: db.users.length + 1, username, email, password };
  db.users.push(newUser);
  res.status(201).json({ message: 'User registered successfully.', user: newUser });
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const user = db.users.find(user => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  // Authentication successful
  res.status(200).json({ message: 'Login successful.', user: user });
};

module.exports = {
  register,
  login,
};
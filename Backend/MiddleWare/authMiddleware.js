const db = require('../config/dbConfig');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  // Extract user ID from token (For simplicity, we are assuming token contains user ID)
  const userId = parseInt(token);

  // Find user by ID
  const user = db.users.find(user => user.id === userId);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }

  // Attach user object to request for further processing
  req.user = user;
  next();
};

module.exports = {
  isAuthenticated,
};
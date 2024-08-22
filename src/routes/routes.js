const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

// Example protected route
router.get('/protected-data', authenticateJWT, (req, res) => {
  res.json({ message: 'This is protected data.' });
});

// Example public route
router.post('/login', (req, res) => {
  // Handle login and return a JWT token
});

module.exports = router;

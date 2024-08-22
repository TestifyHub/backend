const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/validate-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ valid: false });
      }
      res.json({ valid: true });
    });
  } else {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;

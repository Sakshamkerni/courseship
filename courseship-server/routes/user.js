// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // now matches auth.js
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

module.exports = router;

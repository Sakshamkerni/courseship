// courseship-server/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/authorize');
const User = require('../models/User');

// GET /api/admin/users → get all users
router.get('/users', auth, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/users/:id → delete user
router.delete('/users/:id', auth, authorizeRole('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// routes/student.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/User');

// Get current student profile
router.get('/me', auth, async (req, res) => {
  const student = await Student.findById(req.user.id).select('-password');
  res.json(student);
});

// Update profile
router.put('/update', auth, async (req, res) => {
  const { name, bio, skills } = req.body;
  const updated = await Student.findByIdAndUpdate(
    req.user.id,
    { name, bio, skills },
    { new: true }
  ).select('-password');
  res.json(updated);
});

module.exports = router;

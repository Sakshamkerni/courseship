// src/routes/gigs.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Gig = require('../models/Gig');
const authMiddleware = require('../middleware/auth');
const authorizeRole = require('../middleware/authorize');

// GET /api/gigs - List all gigs (public)
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ postedAt: -1 });
    return res.json(gigs);
  } catch (err) {
    console.error('Error listing gigs:', err);
    return res.status(500).json({ message: 'Failed to list gigs' });
  }
});

// POST /api/gigs - Create a new gig (company only)
router.post('/', authMiddleware, authorizeRole('company'), async (req, res) => {
  try {
    let { title, description, skillsRequired, stipend } = req.body;

    // Normalize skillsRequired into array
    let skillsArray = Array.isArray(skillsRequired)
      ? skillsRequired.map(s => s.trim()).filter(Boolean)
      : typeof skillsRequired === 'string'
        ? skillsRequired.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    // Cast stipend
    const stipendValue = Number(stipend);
    if (isNaN(stipendValue)) {
      return res.status(400).json({ message: 'Stipend must be a valid number' });
    }

    // Use req.user.id (set by auth middleware)
    const companyId = req.user.id;

    const newGig = new Gig({
      title,
      description,
      skillsRequired: skillsArray,
      stipend: stipendValue,
      companyId
    });

    await newGig.save();
    return res.status(201).json({ message: 'Gig posted successfully', gig: newGig });
  } catch (err) {
    console.error('Error posting gig:', err);
    return res.status(500).json({ message: 'Failed to post gig' });
  }
});

// GET /api/gigs/my-gigs - Company-specific gig listing
router.get('/my-gigs', authMiddleware, authorizeRole('company'), async (req, res) => {
  try {
    const gigs = await Gig.find({ companyId: req.user.id }).sort({ postedAt: -1 });
    return res.json(gigs);
  } catch (err) {
    console.error('Error fetching my gigs:', err);
    return res.status(500).json({ message: 'Failed to fetch gigs' });
  }
});

// GET /api/gigs/:id - Get a single gig (authenticated users)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid gig ID' });
  }
  try {
    const gig = await Gig.findById(id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    return res.json(gig);
  } catch (err) {
    console.error('Error fetching gig:', err);
    return res.status(500).json({ message: 'Failed to fetch gig' });
  }
});

// PUT /api/gigs/:id - Update a gig (company only)
router.put('/:id', authMiddleware, authorizeRole('company'), async (req, res) => {
  const { id } = req.params;
  let { title, description, skillsRequired, stipend } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid gig ID' });
  }

  // Normalize skills
  const skillsArray = typeof skillsRequired === 'string'
    ? skillsRequired.split(',').map(s => s.trim()).filter(Boolean)
    : Array.isArray(skillsRequired)
      ? skillsRequired.map(s => s.trim()).filter(Boolean)
      : [];

  // Cast stipend
  const stipendValue = Number(stipend);
  if (isNaN(stipendValue)) {
    return res.status(400).json({ message: 'Stipend must be a valid number' });
  }

  try {
    const gig = await Gig.findOneAndUpdate(
      { _id: id, companyId: req.user.id },
      { title, description, skillsRequired: skillsArray, stipend: stipendValue },
      { new: true, runValidators: true }
    );
    if (!gig) return res.status(404).json({ message: 'Gig not found or not authorized' });
    return res.json({ message: 'Gig updated', gig });
  } catch (err) {
    console.error('Error updating gig:', err);
    return res.status(500).json({ message: 'Failed to update gig' });
  }
});

// DELETE /api/gigs/:id - Delete a gig (company only)
router.delete('/:id', authMiddleware, authorizeRole('company'), async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid gig ID' });
  }
  try {
    const gig = await Gig.findOneAndDelete({ _id: id, companyId: req.user.id });
    if (!gig) return res.status(404).json({ message: 'Gig not found or not authorized' });
    return res.json({ message: 'Gig deleted' });
  } catch (err) {
    console.error('Error deleting gig:', err);
    return res.status(500).json({ message: 'Failed to delete gig' });
  }
});

module.exports = router;

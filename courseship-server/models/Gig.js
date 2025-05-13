// src/models/Gig.js
const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one skill is required']
  },
  stipend: {
    type: Number,
    required: true,
    min: [0, 'Stipend must be a positive number']
  },
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gig', gigSchema);

// courseship-server/routes/applications.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/authorize');
const Application = require('../models/Application');
const Gig = require('../models/Gig');
const User = require('../models/User');

// POST /api/applications/apply → student applies to a gig
router.post(
  '/apply',
  auth,
  authorizeRole('student'),
  async (req, res) => {
    try {
      const { gigId, coverLetter } = req.body;
      const studentId = req.user.id;

      // Prevent duplicate applications
      const exists = await Application.findOne({ gigId, studentId });
      if (exists) {
        return res.status(400).json({ message: 'Already applied to this gig' });
      }

      const app = new Application({
        gigId,
        studentId,
        coverLetter
      });
      await app.save();

      res.status(201).json({ message: 'Applied successfully', application: app });
    } catch (err) {
      console.error('Error applying to gig:', err);
      res.status(500).json({ message: 'Application failed' });
    }
  }
);

// GET /api/applications/my-applications → student’s applications
router.get(
  '/my-applications',
  auth,
  authorizeRole('student'),
  async (req, res) => {
    try {
      const studentId = req.user.id;

      const apps = await Application.find({ studentId })
        .populate('gigId')
        .sort({ createdAt: -1 });

      res.json(apps);
    } catch (err) {
      console.error('Error fetching applications:', err);
      res.status(500).json({ message: 'Failed to fetch applications' });
    }
  }
);

// GET /api/applications/company → company’s incoming applications
router.get(
  '/company',
  auth,
  authorizeRole('company'),
  async (req, res) => {
    try {
      const companyId = req.user.id;

      // Find all gigs posted by this company
      const gigs = await Gig.find({ companyId });
      const gigIds = gigs.map(gig => gig._id);

      // Find all applications for those gigs
      const applications = await Application.find({ gigId: { $in: gigIds } })
        .populate('gigId', 'title')
        .populate('studentId', 'name email city')
        .sort({ createdAt: -1 });

      res.json(applications);
    } catch (err) {
      console.error('Error fetching company applications:', err);
      res.status(500).json({ message: 'Failed to fetch applications' });
    }
  }
);

// PATCH /api/applications/:id/status → company accepts/rejects
router.patch(
  '/:id/status',
  auth,
  authorizeRole('company'),
  async (req, res) => {
    try {
      const companyId = req.user.id;
      const { id } = req.params;
      const { status } = req.body; // expected 'accepted' or 'rejected'

      if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      // Load the application + its gig to verify ownership
      const application = await Application.findById(id).populate('gigId');
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      if (application.gigId.companyId.toString() !== companyId) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      application.status = status;
      await application.save();

      // Return updated record (with student & gig populated)
      const updated = await Application.findById(id)
        .populate('gigId', 'title')
        .populate('studentId', 'name email city');

      res.json(updated);
    } catch (err) {
      console.error('Error updating application status:', err);
      res.status(500).json({ message: 'Failed to update status' });
    }
  }
);


module.exports = router;

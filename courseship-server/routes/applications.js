// courseship-server/routes/applications.js
const express   = require('express');
const multer    = require('multer');
const path      = require('path');
const auth      = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const Application = require('../models/Application');
const Gig         = require('../models/Gig');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/resumes/'),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${req.user.id}${ext}`);
  }
});
const upload = multer({ storage });

// POST /api/applications/:gigId
router.post(
  '/:gigId',
  auth,
  authorize('student'),
  upload.single('resume'),
  async (req, res) => {
    try {
      const { name, email, phone, collegeName, coverLetter } = req.body;
      if (!req.file) {
        return res.status(400).json({ msg: 'Resume file is required' });
      }

      // prevent duplicate
      const exists = await Application.findOne({
        gig: req.params.gigId,
        student: req.user.id
      });
      if (exists) {
        return res.status(400).json({ msg: 'Already applied to this gig' });
      }

      const application = new Application({
        gig: req.params.gigId,
        student: req.user.id,
        name, email, phone, collegeName, coverLetter,
        resumeUrl: `/uploads/resumes/${req.file.filename}`
      });

      await application.save();
      res.status(201).json(application);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// GET /api/applications/my-applications
router.get(
  '/my-applications',
  auth,
  authorize('student'),
  async (req, res) => {
    try {
      const apps = await Application.find({ student: req.user.id })
        .populate('gig', 'title')
        .sort({ createdAt: -1 });
      res.json(apps);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Failed to fetch applications' });
    }
  }
);

// GET /api/applications/company
router.get(
  '/company',
  auth,
  authorize('company'),
  async (req, res) => {
    try {
      const gigs = await Gig.find({ companyId: req.user.id });
      const gigIds = gigs.map(g => g._id);
      const applications = await Application.find({ gig: { $in: gigIds } })
        .populate('gig', 'title')
        .populate('student', 'name email city')
        .sort({ createdAt: -1 });
      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Failed to fetch applications' });
    }
  }
);

// PATCH /api/applications/:id/status
router.patch(
  '/:id/status',
  auth,
  authorize('company'),
  async (req, res) => {
    try {
      const { status } = req.body;
      if (!['accepted','rejected'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status' });
      }

      const application = await Application.findById(req.params.id).populate('gig');
      if (!application) return res.status(404).json({ msg: 'Not found' });
      if (application.gig.companyId.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }

      application.status = status;
      await application.save();

      const updated = await Application.findById(req.params.id)
        .populate('gig','title')
        .populate('student','name email city');
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Failed to update status' });
    }
  }
);

module.exports = router;

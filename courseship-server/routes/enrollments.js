// // src/routes/enrollments.js
// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();

// const Enrollment = require('../models/Enrollment');
// const authMiddleware = require('../middleware/auth');
// const authorizeRole = require('../middleware/authorize');

// // POST /api/enrollments - Enroll a student in a course
// router.post('/', authMiddleware, authorizeRole('student'), async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(courseId)) {
//       return res.status(400).json({ message: 'Invalid course ID' });
//     }

//     // Use req.user.id (set by auth middleware)
//     const studentId = req.user.id;

//     // Prevent duplicate enrollment
//     const exists = await Enrollment.findOne({ courseId, studentId });
//     if (exists) {
//       return res.status(400).json({ message: 'Already enrolled in this course' });
//     }

//     const newEnrollment = new Enrollment({ courseId, studentId });
//     await newEnrollment.save();

//     return res.status(201).json({ message: 'Enrolled successfully', enrollment: newEnrollment });
//   } catch (err) {
//     console.error('Error enrolling in course:', err);
//     return res.status(500).json({ message: 'Enrollment failed' });
//   }
// });

// // GET /api/enrollments/my-courses - Get courses the student is enrolled in
// router.get('/my-courses', authMiddleware, authorizeRole('student'), async (req, res) => {
//   try {
//     const studentId = req.user.id;
//     const enrollments = await Enrollment.find({ studentId }).populate('courseId');
//     const courses = enrollments.map(e => e.courseId);
//     return res.json(courses);
//   } catch (err) {
//     console.error('Error fetching my courses:', err);
//     return res.status(500).json({ message: 'Failed to fetch courses' });
//   }
// });

// module.exports = router;




// server/routes/enrollments.js
const express   = require('express');
const mongoose  = require('mongoose');
const router    = express.Router();

const Enrollment = require('../models/Enrollment');
const Course     = require('../models/Course');
const auth       = require('../middleware/auth');
const authorize  = require('../middleware/authorize');

// ── Enroll in a course ───────────────────────────────────────────────────
// POST /api/enrollments/:courseId/enroll
router.post(
  '/:courseId/enroll',
  auth,
  authorize('student'),
  async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user.id;

    // 1️⃣ Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    try {
      // 2️⃣ Prevent duplicate enrollment
      const exists = await Enrollment.findOne({ courseId, studentId });
      if (exists) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }

      // 3️⃣ Create enrollment
      const newEnrollment = new Enrollment({ courseId, studentId });
      await newEnrollment.save();
      res.status(201).json({
        message: 'Enrolled successfully',
        enrollment: newEnrollment
      });
    } catch (err) {
      console.error(`POST /api/enrollments/${courseId}/enroll error:`, err.stack);
      res.status(500).json({ message: 'Enrollment failed' });
    }
  }
);

// ── Get my courses ────────────────────────────────────────────────────────
// GET /api/enrollments/my-courses
router.get(
  '/my-courses',
  auth,
  authorize('student'),
  async (req, res) => {
    try {
      const studentId   = req.user.id;
      const enrollments = await Enrollment.find({ studentId }).populate('courseId');
      const courses     = enrollments.map(e => e.courseId);
      res.json(courses);
    } catch (err) {
      console.error('GET /api/enrollments/my-courses error:', err.stack);
      res.status(500).json({ message: 'Failed to fetch courses' });
    }
  }
);

// ── Mark topic complete ──────────────────────────────────────────────────
// POST /api/enrollments/:courseId/complete-topic
router.post(
  '/:courseId/complete-topic',
  auth,
  authorize('student'),
  async (req, res) => {
    const { courseId } = req.params;
    const { topicId }  = req.body;
    const studentId    = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    try {
      const enr = await Enrollment.findOne({ courseId, studentId });
      if (!enr) return res.status(404).json({ message: 'Not enrolled' });

      if (!enr.completedTopics.includes(topicId)) {
        enr.completedTopics.push(topicId);

        // Recompute progress & XP
        const course = await Course.findById(courseId);
        const total  = course.topics.length;
        const done   = enr.completedTopics.length;
        enr.progress = Math.floor((done / total) * 100);
        enr.xp       = done * 10;

        await enr.save();
      }

      res.json({ progress: enr.progress, xp: enr.xp });
    } catch (err) {
      console.error(`POST /api/enrollments/${courseId}/complete-topic error:`, err.stack);
      res.status(500).json({ message: 'Server error completing topic' });
    }
  }
);

// ── Get progress & XP ────────────────────────────────────────────────────
// GET /api/enrollments/:courseId/progress
router.get(
  '/:courseId/progress',
  auth,
  authorize('student'),
  async (req, res) => {
    const { courseId } = req.params;
    const studentId    = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    try {
      const enr = await Enrollment.findOne({ courseId, studentId });
      if (!enr) return res.status(404).json({ message: 'Not enrolled' });
      res.json({
        progress: enr.progress,
        xp: enr.xp,
        completedTopics: enr.completedTopics
      });
    } catch (err) {
      console.error(`GET /api/enrollments/${courseId}/progress error:`, err.stack);
      res.status(500).json({ message: 'Server error fetching progress' });
    }
  }
);

module.exports = router;

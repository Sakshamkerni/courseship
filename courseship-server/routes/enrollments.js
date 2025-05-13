// src/routes/enrollments.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Enrollment = require('../models/Enrollment');
const authMiddleware = require('../middleware/auth');
const authorizeRole = require('../middleware/authorize');

// POST /api/enrollments - Enroll a student in a course
router.post('/', authMiddleware, authorizeRole('student'), async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Use req.user.id (set by auth middleware)
    const studentId = req.user.id;

    // Prevent duplicate enrollment
    const exists = await Enrollment.findOne({ courseId, studentId });
    if (exists) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const newEnrollment = new Enrollment({ courseId, studentId });
    await newEnrollment.save();

    return res.status(201).json({ message: 'Enrolled successfully', enrollment: newEnrollment });
  } catch (err) {
    console.error('Error enrolling in course:', err);
    return res.status(500).json({ message: 'Enrollment failed' });
  }
});

// GET /api/enrollments/my-courses - Get courses the student is enrolled in
router.get('/my-courses', authMiddleware, authorizeRole('student'), async (req, res) => {
  try {
    const studentId = req.user.id;
    const enrollments = await Enrollment.find({ studentId }).populate('courseId');
    const courses = enrollments.map(e => e.courseId);
    return res.json(courses);
  } catch (err) {
    console.error('Error fetching my courses:', err);
    return res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

module.exports = router;

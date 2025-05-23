// // courseship-server/routes/courses.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Course = require('../models/Course');

// // Multer storage with absolute uploads path
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // POST /api/courses - Add new course with image
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

//     const course = new Course({
//       imageUrl,
//       title: req.body.title,
//       description: req.body.description,
//       duration: req.body.duration,
//       category: req.body.category,
//       level: req.body.level,
//       topics: JSON.parse(req.body.topics)
//     });

//     await course.save();
//     res.status(201).json(course);
//   } catch (err) {
//     console.error('Error creating course:', err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // GET /api/courses - Get all courses
// router.get('/', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET /api/courses/:id - Get a specific course by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: 'Course not found' });
//     res.json(course);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // PUT /api/courses/:id - Update a course (optional image update)
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: 'Course not found' });

//     course.imageUrl = req.file ? `/uploads/${req.file.filename}` : course.imageUrl;
//     course.title      = req.body.title       || course.title;
//     course.description= req.body.description || course.description;
//     course.duration   = req.body.duration    || course.duration;
//     course.category   = req.body.category    || course.category;
//     course.level      = req.body.level       || course.level;
//     course.topics     = req.body.topics
//                           ? JSON.parse(req.body.topics)
//                           : course.topics;

//     await course.save();
//     res.json(course);
//   } catch (err) {
//     console.error('Error updating course:', err);
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;


// server/routes/courses.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');

// Multer storage with absolute uploads path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/courses - Add new course with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const course = new Course({
      imageUrl,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      category: req.body.category,
      level: req.body.level,
      topics: JSON.parse(req.body.topics)
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error('POST /api/courses error:', err.stack);
    res.status(400).json({ message: err.message });
  }
});

// GET /api/courses - Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('GET /api/courses error:', err.stack);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
});

// GET /api/courses/:id - Get a specific course by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(`GET /api/courses/${id} error:`, err.stack);
    res.status(500).json({ message: 'Server error fetching course' });
  }
});

// PUT /api/courses/:id - Update a course (optional image update)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.imageUrl   = req.file ? `/uploads/${req.file.filename}` : course.imageUrl;
    course.title      = req.body.title       || course.title;
    course.description= req.body.description || course.description;
    course.duration   = req.body.duration    || course.duration;
    course.category   = req.body.category    || course.category;
    course.level      = req.body.level       || course.level;
    course.topics     = req.body.topics
                          ? JSON.parse(req.body.topics)
                          : course.topics;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(`PUT /api/courses/${id} error:`, err.stack);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

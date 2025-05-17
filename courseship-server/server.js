// courseship-server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// 🔧 Ensure uploads/ exists before anything else
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

const uploadDir       = path.join(__dirname, 'uploads');
 const resumeUploadDir = path.join(uploadDir, 'resumes');
 [uploadDir, resumeUploadDir].forEach(dir => {
   if (!fs.existsSync(dir)) {
     fs.mkdirSync(dir, { recursive: true });
  }
 });

// Middleware 🔥
app.use(cors());
app.use(express.json()); // ✅ This must come before route handlers

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');
const gigRoutes = require('./routes/gigs');
const appRoutes = require('./routes/applications');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// JSON error handler
app.use((err, req, res, next) => {
  console.error('🔥 Uncaught error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to Courseship Backend API 🚀');
});

// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

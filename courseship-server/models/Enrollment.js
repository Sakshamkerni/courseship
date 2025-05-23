// const mongoose = require('mongoose');

// const enrollmentSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   courseId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   },
//   enrolledAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Enrollment', enrollmentSchema);




// courseship-server/models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },

  // ── NEW FIELDS ───────────────────────────────────────────────────────────
  completedTopics: [{ type: String }],      // store each topic’s ID
  progress:        { type: Number, default: 0 }, // 0–100%
  xp:              { type: Number, default: 0 }, // experience points earned
}, {
  timestamps: true
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);


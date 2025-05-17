// // courseship-server/models/Application.js
// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//   gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   coverLetter: { type: String },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
//   // appliedAt can be removed now that we use timestamps(),
//   // but you can keep it if you need a separate field:
//   // appliedAt: { type: Date, default: Date.now }
// }, {
//   timestamps: true,    // <-- adds createdAt & updatedAt automatically
// });

// module.exports = mongoose.model('Application', applicationSchema);






// courseship-server/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  gig:          { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  student:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter:  { type: String },

  // NEW fields
  name:         { type: String, required: true },
  email:        { type: String, required: true },
  phone:        { type: String, required: true },
  collegeName:  { type: String, required: true },
  resumeUrl:    { type: String, required: true },

  status: {
    type: String,
    enum: ['pending','accepted','rejected'],
    default: 'pending'
  }
}, {
  timestamps: true,    // adds createdAt & updatedAt
});

module.exports = mongoose.model('Application', applicationSchema);

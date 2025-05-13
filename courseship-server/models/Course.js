// courseship-server/models/Course.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url:  { type: String, required: true },
  type: {
    type: String,
    enum: ['pdf', 'video', 'doc', 'code'],
    default: 'pdf'
  }
});

const questionSchema = new mongoose.Schema({
  text:          { type: String, required: true },
  options:       [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }
});

const topicSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  videoUrl: { type: String, required: true },
  pdfUrl:   { type: String },                  // optional
  completed:{ type: Boolean, default: false }, // optional progress
  resources:[resourceSchema],                  // keep if you want
  quiz: {
    questions: [questionSchema]
  }
});

const courseSchema = new mongoose.Schema({
  imageUrl:   { type: String, required: true },
  title:      { type: String, required: true },
  description:{ type: String, required: true },
  duration:   { type: String, required: true },
  category:   { type: String, required: true },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  topics:     [topicSchema],
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

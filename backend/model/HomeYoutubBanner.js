const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  images: {
    type: String, // Store the image URL or file path
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);

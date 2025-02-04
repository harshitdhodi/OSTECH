const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String },
    youtubeId: { type: String },
    duration: { type: String },
    views: { type: String },
    channel: { type: String },
    videoId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);

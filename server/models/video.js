const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  videoUrl: String,
  publishedAt: String,
});

module.exports = mongoose.model('video', videoSchema, 'videos');

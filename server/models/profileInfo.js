const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  _id: String,
  profileImageUrl: String,
  name: String,
  age: Number,
  bio: String,
});

module.exports = mongoose.model('profileInfo', profileSchema, 'profile-Info');

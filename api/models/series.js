const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  start_year: String,
  season_count: Number
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Series', schema)
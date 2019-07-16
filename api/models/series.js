var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seriesSchema = new Schema({
  title: { type: String, required: true },
  start_year: { type: Number, required: true },
  season_count: { type: Number, required: true },
  characters: [{
    name: { type: String, required: true },
    image_url: String
  }]
}, 
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Series', seriesSchema)
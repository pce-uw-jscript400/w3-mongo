var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title:  {
    type: String,
    required: [true, "Title is blank"]
  },
  start_year: {
    type: Number,
    required: true
  },
  season_count:  {
    type: Number,
    required: true
  },
  characters: [{
    name: {
      type: String,
      required: true
    },
    image_url: String
  }]
}, {
  // every database uses snake case by default
  // in this case we are remapping these
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Series', schema)
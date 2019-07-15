const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'] 
  },
  start_year: {
    type: Number,
    required: [true, 'start_year is required'] 
  },
  season_count: {
    type: Number,
    required: [true, 'season_count is required']    
  },
  characters: [{
    name: {
      type: String,
        required: [true, 'name is required']},
    image_url: String
  }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Series', schema)


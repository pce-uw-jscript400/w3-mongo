
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);



const schema = new mongoose.Schema({
    title:  {
        type: String,
        require: true
    },
    start_year: {
        type: Number,
        required: this
    },
    season_count: {
        type: Number,
        required: true
    },
    characters: [{
        name: String,
        image_url: String
    }]
  },   {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

  module.exports = mongoose.model('Series', schema)
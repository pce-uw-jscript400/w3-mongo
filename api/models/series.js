const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: {
    type: String,
    required: true,
    
  },
  start_year: {
    type: Number,
    isAsync: true,
    validate: {
      validator: (input) => {
        return input.toString().length == 4;
      },
      msg: `start_year must be a 4 digit number`
    }
  },
  season_count: Number,
  characters: [
    {
      name: {
        type: String,
        required: true
      },
      image_url: {
        type: String
      }
    }
  ]
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)

module.exports = mongoose.model('Series', seriesSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: {
    type: String,
    required: true,
    
  },
  start_year: Number,
  season_count: Number
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)

module.exports = mongoose.model('Series', seriesSchema)
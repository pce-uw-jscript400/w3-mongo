var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

var schema = new Schema({
  title: String,
  start_year: {
    type: Number, 
    required: true
  },
  season_count: {
    type: Number, 
    required: true
  // _id: Schema.Types.ObjectId
},
characters: [{
  name: String,
  actor: String
}]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Series', schema)

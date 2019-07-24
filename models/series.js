var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    // _id: Schema.Types.ObjectId, // Primary, 
    title:  {
        type: String,
        required: true
    }, 
    start_year: {
        type: Number,
        required: true
    },
    season_count: { 
        type: Number,
        required: true
    },
    characters: [{
        name: String,
        actor: String
    }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
  
// var schema = new mongoose.Schema({
//     title: String, 
//     start_year: Number,
//     season_count: Number
//   }, {
//       timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
//     });

module.exports = mongoose.model('Series', schema)

// for a television series. Include the fields "title", "start_year", and "season_count".

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvSchema = new Schema({
    title:  {type: String, required: true},
    // author: String,
    start_year: {type: Number, required: true},
    season_count: {type: Number, required: true},
    characters: [{
        name:  {
            type: String,
            required: true
        },
        actor: {
            type: String
        },
        image_url: {
            type: String
        }
    }]
    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

  module.exports = mongoose.model('Series', tvSchema)
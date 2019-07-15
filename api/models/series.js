const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title:  {
        type: String,
        require: true
    },
    start_year: {
        type: Number,
        require: true
    },
    season_count: {
        type: Number,
        require: true
    }, 
    characters: [{
        name: {
        type: String,
        required: true
        },
        image_url: String
    }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Series', schema)
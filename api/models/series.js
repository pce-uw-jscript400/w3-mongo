const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    }
});

const schema = new Schema({
        title: {
            type: String,
            required: true,
        },
        start_year: {
            type: Number,
            required: true
        },
        season_count: {
            type: Number,
            required: true
        },
        characters: [characterSchema]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        select: false
    }
);



module.exports = mongoose.model('Series', schema);
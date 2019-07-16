const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
    //optional, this can be omitted
    //_id: Schema.Types.ObjectId,
    title:  {
        type: String,
        required: true
    },

    start_year: {
       type: Number,
       required: true
    },
    season_count: {
        type:Number,
        required: true
    },
    characters: [{
        name: String,
        actor: String
    }]
}, {
    //not remapped timestamps: true
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Series', seriesSchema);
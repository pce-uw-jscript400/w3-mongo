var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    //_id: Schema.Types.ObjectId,

    title: String,
    start_year: Number,
    season_count: Number
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = mongoose.model("Series", schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const televisionSchema = new Schema(
  {
    title: String,
    start_year: Number,
    season_count: Number
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Series = mongoose.model("Series", televisionSchema);

module.exports = Series;

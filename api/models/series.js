const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const televisionSchema = new Schema(
  {
    title: { type: String, required: true },
    start_year: { type: Number, required: true },
    season_count: { type: Number, required: true },
    characters: [
      {
        name: {
          type: String,
          required: true
        },
        image_url: String
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// const Series = mongoose.model("Series", televisionSchema);

// module.exports = Series;

module.exports = mongoose.model("Series", televisionSchema);

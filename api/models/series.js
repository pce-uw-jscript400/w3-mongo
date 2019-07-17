const mongoose = require("mongoose");

// const charSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image_url: { type: String }
// });
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start_year: { type: Number, required: true },
    season_count: { type: Number, required: true },
    // characters: [charSchema]
    character: [
      {
        name: {
          type: String,
          required: true
        },
        image_url: { type: String }
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);
module.exports = mongoose.model("Series", schema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Stream", "Event", "Play", "Sport", "Activity"],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  cast: [
    {
      type: String,
    },
  ],
  supportingLanguages: [
    {
      type: String,
    },
  ],
  thumbnail: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);

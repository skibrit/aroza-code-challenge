const mongoose = require("mongoose");

const MovieScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    actors: [
      {
        name: {
          type: String,
          required: true
        },
        birthday: {
          type: Date,
          required: true
        },
        country: {
          type: String,
          required: true
        }
      }
    ]
  },
  { collection: "Movies" }
);

module.exports = mongoose.model("Movie", MovieScheme);

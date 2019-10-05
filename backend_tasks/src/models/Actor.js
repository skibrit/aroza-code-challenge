const mongoose = require("mongoose");

const ActorScheme = new mongoose.Schema(
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
  },
  { collection: "Actors" }
);

module.exports = mongoose.model("Actor", ActorScheme);

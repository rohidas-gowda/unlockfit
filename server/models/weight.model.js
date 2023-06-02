const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dailydate: {
      type: String,
      required: true,
    },
    idealweight: {
      type: Number,
      required: true,
    },
    currentweight: {
      type: Number,
      required: true,
    },
    inkg: {
      type: Number,
      required: true,
      default: 1
    }
  },
  { collection: "collection-weight" }
);

const Weight = mongoose.model("Weight", WeightSchema);

module.exports = Weight;

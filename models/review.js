const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    gameId: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);

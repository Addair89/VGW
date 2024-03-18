const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    gameId: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    rating: { type: Number, enum: [5, 4, 3, 2, 1] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);

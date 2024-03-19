const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListGameSchema = new Schema({
  name: { type: String },
  id: { type: Number },
  details: { type: String },
  website: { type: String },
  platforms: { type: Array }, //this needs to be an array
  screenShots: { type: Array }, //this needs to be an array
  genres: { type: Array }, //this needs to be an array
  metacritic: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" },
});

module.exports = mongoose.model("WishListGame", wishListGameSchema);

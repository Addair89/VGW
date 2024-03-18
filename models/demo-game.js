const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const demoGameSchema = new Schema({
  name: { type: String },
  id: { type: String },
  details: { type: String },
  platforms: { type: Array }, //this needs to be an array
  screenShots: { type: Array }, //this needs to be an array
  genres: { type: Array }, //this needs to be an array
  metacritic: { type: number },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" },
});

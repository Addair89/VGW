const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");
const ROOT_URL = "https://api.rawg.io/api/games";

const add = async (req, res) => {
  const API_KEY = process.env.APIKEY;
  const data = await fetch(`${ROOT_URL}/${req.params.id}?key=${API_KEY}`);
  const game = await data.json();
  req.body.user = req.user._id;
  req.body.details = game.description;
  await WishListGame.create(req.body);
  await User.updateOne({ _id: req.user._id }, { $inc: { wishListCount: 1 } });
  res.redirect("/show");
};

const remove = async (req, res) => {};

module.exports = {
  add,
  remove,
};

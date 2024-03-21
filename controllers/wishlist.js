const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");
const ROOT_URL = "https://api.rawg.io/api/games";

const add = async (req, res) => {
  await User.updateOne({ _id: req.user._id }, { $inc: { wishListCount: 1 } });
  const API_KEY = process.env.APIKEY;
  const data = await fetch(`${ROOT_URL}/${req.params.id}?key=${API_KEY}`);
  const game = await data.json();
  const screenShotsObj = JSON.parse(req.body.screenShots);
  const genresObj = JSON.parse(req.body.genres);
  const platformsObj = JSON.parse(req.body.platforms);
  req.body.website = game.website;
  req.body.screenShots = screenShotsObj;
  req.body.genres = genresObj;
  req.body.platforms = platformsObj;
  req.body.user = req.user._id;
  req.body.details = game.description_raw;
  await WishListGame.create(req.body);
  res.redirect("/games/show");
};

const removeOne = async (req, res) => {
  await WishListGame.deleteOne({ id: req.params.id });
  await User.updateOne({ _id: req.user._id }, { $inc: { wishListCount: -1 } });
  let user = await User.find({ _id: req.user._id });
  if (user.wishListCount > 0) res.redirect("/wishlist/show");
  res.redirect("/users");
};

const show = async (req, res) => {
  let wishlist = await WishListGame.find({ user: req.user._id });
  const reviewedGames = await Review.find({ user: req.user._id });
  console.log(wishlist, "------------------------");
  res.render("user-views/wishlist", {
    wishlist,
    reviewedGames,
  });
};

module.exports = {
  add,
  delete: removeOne,
  show,
};

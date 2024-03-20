const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");

const add = async (req, res) => {
  console.log(req.body);
  req.body.gameId = req.params.id;
  req.body.user = req.user.id;
  const review = await Review.create(req.body);
  await User.updateOne({ _id: req.user._id }, { $inc: { reviewCount: 1 } });
  let wishListGame = await WishListGame.findOne({ id: req.body.gameId });
  if (wishListGame) {
    wishListGame.reviews.push(review._id);
    await wishListGame.save();
  }
  res.redirect("/users");
};

const show = async (req, res) => {
  try {
    const API_KEY = process.env.APIKEY;
    const ROOT_URL = "https://api.rawg.io/api/games";
    const reviewedGames = await Review.find({ user: req.user.id });
    const gameIds = reviewedGames.map((el) => el.gameId);
    const gamesPromises = gameIds.map(async (id) => {
      const response = await fetch(`${ROOT_URL}/${id}?key=${API_KEY}`);
      const game = await response.json();
      return game;
    });
    const games = await Promise.all(gamesPromises);
    reviewedGames.forEach((el) => {
      console.log(el.gameId);
    });
    res.render("user-views/reviews", {
      games,
      reviewedGames,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const edit = async (req, res) => {
  const filter = { gameId: req.params.id };
  const update = {
    rating: req.body.rating,
    user: req.user._id,
    gameId: req.params.id,
  };
  await Review.findOneAndUpdate(filter, update);
  console.log(req.body);
  if (req.body.reviewPage) res.redirect("/review/show");
  if (req.body.wishlistPage) res.redirect("/wishlist/show");
};

const removeOne = async (req, res) => {
  let review = await Review.find({ gameId: req.params.id });
  let wishListGame = await WishListGame.findOne({ id: req.params.id });
  if (wishListGame) {
    let index = wishListGame.reviews.indexOf(review._id);
    wishListGame.reviews.splice(index, 1);
    await wishListGame.save();
  }
  await Review.deleteOne({ gameId: req.params.id });
  await User.updateOne({ _id: req.user._id }, { $inc: { reviewCount: -1 } });
  res.redirect("/users");
};

module.exports = {
  add,
  show,
  edit,
  delete: removeOne,
};

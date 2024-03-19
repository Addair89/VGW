const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");

const add = async (req, res) => {
  console.log(req.body);
  await User.updateOne({ _id: req.user._id }, { $inc: { reviewCount: 1 } });
  req.body.gameId = req.params.id;
  req.body.user = req.user.id;
  await Review.create(req.body);
  res.render("user-views/index");
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
    console.log(games);
    res.render("user-views/reviews", {
      games,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  add,
  show,
};

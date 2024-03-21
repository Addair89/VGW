const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");

const ROOT_URL = "https://api.rawg.io/api/games";

const showAll = async (req, res) => {
  const API_KEY = process.env.APIKEY;
  const reviewedGames = await Review.find({ user: req.user._id });
  let response = await fetch(`${ROOT_URL}?key=${API_KEY}&metacritic=90,100`);
  let games = await response.json();
  let wishListGames = await WishListGame.find({});
  let wishListIds = wishListGames.map((el) => {
    return el.id;
  });

  res.render("games/show", {
    games,
    wishListIds,
    reviewedGames,
  });
};

const showSearch = async (req, res) => {
  console.log(req.query.search);
  const searchTerm = req.query.search;
  const API_KEY = process.env.APIKEY;
  const reviewedGames = await Review.find({ user: req.user._id });
  let response = await fetch(`${ROOT_URL}?key=${API_KEY}&search=${searchTerm}`);
  let games = await response.json();
  let wishListGames = await WishListGame.find({});
  let wishListIds = wishListGames.map((el) => {
    return el.id;
  });

  res.render("games/show", {
    games,
    wishListIds,
    reviewedGames,
  });
};

const next = async (req, res) => {
  const API_KEY = process.env.APIKEY;
  let response = await fetch(`${ROOT_URL}?key=${API_KEY}&${req.params.page}`);
  const reviewedGames = await Review.find({ user: req.user._id });
  let games = await response.json();
  let wishListGames = await WishListGame.find({});
  let wishListIds = wishListGames.map((el) => {
    return el.id;
  });

  res.render("games/show", {
    games,
    wishListIds,
    reviewedGames,
  });
};

const prev = async (req, res) => {
  console.log("------Runnniiiinnnggggg------");
  console.log(req.params.page);
  const API_KEY = process.env.APIKEY;
  let response;
  if (req.params.page.indexOf("page") === -1) {
    response = await fetch(`${ROOT_URL}?key=${API_KEY}`);
  } else {
    response = await fetch(`${ROOT_URL}?key=${API_KEY}&${req.params.page}`);
  }
  let games = await response.json();
  let wishListGames = await WishListGame.find({});
  const reviewedGames = await Review.find({ user: req.user._id });
  let wishListIds = wishListGames.map((el) => {
    return el.id;
  });

  res.render("games/show", {
    games,
    wishListIds,
    reviewedGames,
  });
};

const showOne = async (req, res) => {
  const API_KEY = process.env.APIKEY;
  const data = await fetch(`${ROOT_URL}/${req.params.id}?key=${API_KEY}`);
  const game = await data.json();
  console.log(game);
  let screenShots = req.query.screenShots1;
  console.log(screenShots);
  const wishlist = await WishListGame.find({ id: req.params.id });
  console.log(wishlist);
  const reviewedGames = await Review.find({ user: req.user._id });
  res.render("games/show-one", {
    game,
    wishlist,
    reviewedGames,
    screenShots,
  });
};

module.exports = {
  showAll,
  showSearch,
  next,
  prev,
  showOne,
};

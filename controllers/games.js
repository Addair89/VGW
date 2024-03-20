const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");

const ROOT_URL = "https://api.rawg.io/api/games";

const showAll = async (req, res) => {
  const API_KEY = process.env.APIKEY;
  let response = await fetch(`${ROOT_URL}?key=${API_KEY}&metacritic=90,100`);
  let games = await response.json();
  let wishListGames = await WishListGame.find({});
  let wishListIds = wishListGames.map((el) => {
    return el.id;
  });

  res.render("games/show", {
    games,
    wishListIds,
  });
};

const showSearch = async (req, res) => {
  console.log(req.query.search);
  const searchTerm = req.query.search;
  const API_KEY = process.env.APIKEY;
  let response = await fetch(`${ROOT_URL}?key=${API_KEY}&search=${searchTerm}`);
  let games = await response.json();
  console.log(games);
  let wishListGames = await WishListGame.find({});
  let wishListIds = wishListGames.map((el) => {
    return el.id;
  });

  res.render("games/show", {
    games,
    wishListIds,
  });
};

module.exports = {
  showAll,
  showSearch,
};

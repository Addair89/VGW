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
  console.log(wishListIds);

  res.render("games/show", {
    games,
    wishListIds,
  });
};

module.exports = {
  showAll,
};

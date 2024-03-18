const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");

const index = async (req, res) => {
  let user = await User.findById(req.user.id);
  let reviews = await Review.find({ user: user._id });
  let wishListGames = await WishListGame.find({ user: user._id });
  if (!user) {
    user = await User.create(req.user);
  }
  res.render("user-views/index", {
    user,
    reviews,
    wishListGames,
  });
};

module.exports = {
  index,
};

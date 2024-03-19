const User = require("../models/user");
const Review = require("../models/review");
const WishListGame = require("../models/wishListGame");

const add = async (req, res) => {
  console.log(req.body);
  await User.updateOne({ _id: req.user._id }, { $inc: { reviewCount: 1 } });
  req.body.gameId = req.params.id;
  req.body.user = req.user.id;
  await Review.create(req.body);
  res.redirect("/user-views/index");
};

module.exports = {
  add,
};

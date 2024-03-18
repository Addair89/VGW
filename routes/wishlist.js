var express = require("express");
var router = express.Router();
var wishlistCtrl = require("../controllers/wishlist");

router.post("/add/:id", wishlistCtrl.add);

module.exports = router;

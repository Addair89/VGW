var express = require("express");
var router = express.Router();
var wishlistCtrl = require("../controllers/wishlist");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/add/:id", ensureLoggedIn, wishlistCtrl.add);
router.delete("/delete/:id", ensureLoggedIn, wishlistCtrl.delete);
router.get("/show", ensureLoggedIn, wishlistCtrl.show);

module.exports = router;

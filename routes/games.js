var gamesCtrl = require("../controllers/games");
var express = require("express");
var router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/show", ensureLoggedIn, gamesCtrl.showAll);
router.get("/search", ensureLoggedIn, gamesCtrl.showSearch);
module.exports = router;

var gamesCtrl = require("../controllers/games");
var express = require("express");
var router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/show", ensureLoggedIn, gamesCtrl.showAll);
router.get("/search", ensureLoggedIn, gamesCtrl.showSearch);
router.get("/next/:page", ensureLoggedIn, gamesCtrl.next);
router.get("/prev/:page", ensureLoggedIn, gamesCtrl.prev);
module.exports = router;

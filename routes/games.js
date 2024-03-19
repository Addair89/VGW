var gamesCtrl = require("../controllers/games");
var express = require("express");
var router = express.Router();

router.get("/show", gamesCtrl.showAll);

module.exports = router;

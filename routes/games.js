var gamesCtrl = require("../controllers/games");
var express = require("express");
var router = express.Router();

router.get("/show", gamesCtrl.showAll);
router.get("/search", gamesCtrl.showSearch);
module.exports = router;

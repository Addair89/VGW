var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/user");

/* everything starts with slach /users */
router.get("/", userCtrl.index);
router.get("/wishlist-games");

module.exports = router;

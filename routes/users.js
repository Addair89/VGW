var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/user");
const ensureLoggedIn = require("../config/ensureLoggedIn");

/* everything starts with slach /users */
router.get("/", ensureLoggedIn, userCtrl.index);

module.exports = router;

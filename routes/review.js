var express = require("express");
var router = express.Router();

var reviewCtrl = require("../controllers/reviews");
const ensureLoggedIn = require("../config/ensureLoggedIn");

//Everything starts in "/review"
router.get("/show", ensureLoggedIn, reviewCtrl.show);
router.post("/new/:id", ensureLoggedIn, reviewCtrl.add);
router.delete("/delete/:id", ensureLoggedIn, reviewCtrl.delete);
router.put("/:id", ensureLoggedIn, reviewCtrl.edit);
module.exports = router;

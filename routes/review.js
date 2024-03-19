var express = require("express");
var router = express.Router();

var reviewCtrl = require("../controllers/reviews");

//Everything starts in "/review"
router.get("/show", reviewCtrl.show);
router.post("/new/:id", reviewCtrl.add);
module.exports = router;

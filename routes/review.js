var express = require("express");
var router = express.Router();

var reviewCtrl = require("../controllers/reviews");

router.post("/new/:id", reviewCtrl.add);
module.exports = router;

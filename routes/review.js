var express = require("express");
var router = express.Router();

var reviewCtrl = require("../controllers/reviews");

//Everything starts in "/review"
router.get("/show", reviewCtrl.show);
router.post("/new/:id", reviewCtrl.add);
router.put("/:id", reviewCtrl.edit);
module.exports = router;

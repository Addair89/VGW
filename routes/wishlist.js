var express = require("express");
var router = express.Router();
var wishlistCtrl = require("../controllers/wishlist");

router.post("/add/:id", wishlistCtrl.add);
router.delete("/delete/:id", wishlistCtrl.delete);
router.get("/show", wishlistCtrl.show);

module.exports = router;

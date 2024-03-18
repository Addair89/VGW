var express = require("express");
var router = express.Router();
var passport = require("passport");

const ROOT_URL = "https://api.rawg.io/api/games";
/* GET home page. */

router.get("/", function(req, res) {
  const API_KEY = process.env.APIKEY;
  fetch(
    `${ROOT_URL}?key=${API_KEY}&dates=2023-01-01,2023-12-31&metacritic=90,100`
  )
    .then((res) => res.json())
    .then((gameData) => {
      res.render("index", { title: "", gameData });
    });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/users",
    failureRedirect: "/",
  })
);

router.get("/logout", function(req, res) {
  req.logout(function() {
    res.redirect("/");
  });
});

module.exports = router;

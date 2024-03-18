//6df3d75a53214559b25f1ebef1cbb3c2
//https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=6df3d75a53214559b25f1ebef1cbb3c2&dates=2019-09-01,2019-09-30&platforms=18,1,7
///my games model i believe i will the need the following data from the JSON thats returned
/*
in the response i will get a results array, each element in the array is a game.
within the game i want to get the: 
.name, 
.id, 
.parent_platforms.platform.name(parent_platforms is an array of objects), 
.short_screenshots.image(this is an arary of images onjects), 
genres.name(genres is an array of objects).
*/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var wishlistRouter = require("./routes/wishlist");

var app = express();

require("dotenv").config();
require("./config/database");
require("./config/passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/wishlist", wishlistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

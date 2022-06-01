var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

var passport = require("passport");
var session = require("express-session");

require("./passport");
var config = require("./config");

var indexRoute = require("./routes/index");
var authRoute = require("./routes/auth");
var taskRoute = require("./routes/task");
const {
  notFoundMiddleware,
  globalErrorHandler,
} = require("./middlewares/errors");

require("./db");

global.User = require("./models/user");
global.Task = require("./models/task");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cookieParser());
app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.use("/", indexRoute);
app.use("/", authRoute);
app.use("/", taskRoute);

// catch 404 and forward to error handler
app.use(notFoundMiddleware);

// error handler
app.use(globalErrorHandler);

module.exports = app;

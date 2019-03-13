"use strict";

const Path = require("path");
const Logger = require("morgan");
const Express = require("express");
const CreateError = require("http-errors");
const CookieParser = require("cookie-parser");

const app = Express();

// view engine setup
app.set("views", Path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(Logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(Express.static(Path.join(__dirname, "public")));

app.use("*", (req, res, next) => {
  const vectors = {
    headers: req.headers,
    body: req.body,
    query: req.query,
  }
  res.json(vectors);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(CreateError(404));
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

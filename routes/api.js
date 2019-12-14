var express = require("express");
var authRouter = require("./auth");
var eventRequest = require("./event");

var app = express();

app.use("/auth/", authRouter);
app.use("/events/", eventRequest);

module.exports = app;
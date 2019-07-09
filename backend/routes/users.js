var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

// Get All Users
router.get("/", function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// Post
router.post("/", function(req, res, next) {
  User.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

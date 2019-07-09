var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

// Get All Posts
router.get("/", function(req, res, next) {
  User.find({}).select('posts-_id').exec(function(err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

module.exports = router;

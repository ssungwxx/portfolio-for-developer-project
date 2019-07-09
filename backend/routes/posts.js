var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

// Get All Posts
router.get("/", function(req, res, next) {
  User.find({}).select({"posts": 1, "_id": 0}).exec(function(err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

// Get One Post

// Add New Post

// Modify Post

// Delete Post


module.exports = router;

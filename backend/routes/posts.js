var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

// Get Specific User's All Posts
router.get("/:id", function(req, res, next) {
  User.find({
    "user_id": req.param.id
  }).select({
    "posts": 1,
    "_id": 0
  }).exec(function(err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
  //   var v = posts[0]["posts"][0];
  //   console.log(v.post_name);
});

// Get Specific User's One Post
router.get("/:id/:pname", function(req, res, next) {
  User.findOne({
      "user_id": req.params.id
    }, {
      "posts": {
        $elemMatch: {
          "post_name": req.params.pname
        }
      }
    })
    .exec(function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

// Add New Post
// Problem: Object_id가 같이 들어가는 문제 해결해야함
router.put("/add/:id", function(req, res, next) {
  User.updateOne({
    "user_id": req.param.id
  }, {
    $push: {
      "posts": req.body
    }
  }).exec(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Modify Post


// Delete Post
router.put("/delete/:id/:pname", function(req, res, next) {
  User.updateOne({
    "user_id": req.params.id
  }, {
    $pull: {
      "posts": {
        "post_name": req.params.pname
      }
    }
  }).exec(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

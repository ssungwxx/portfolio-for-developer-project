var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

// Get Specific User's All Posts
// If using find() query, sort() not working.
// So, sort collection by date by using update.
// Then, load sorted collection to the page.
router.get("/get/:id", function(req, res, next) {
  User.updateOne({
    "user_id": req.params.id
  }, {
    $push: {
      "posts": {
        $each: [],
        $sort: {
          "post_date": -1
        }
      }
    }
  }).exec();

  User.findOne({
    "user_id": req.params.id
  }, {
    "posts": 1
  }).exec(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
  // User.find({"user_id": req.params.id}, {"posts": 1}).sort({"datefield": -1}).exec(function(err, posts) {
  //   console.log(req.params.id);
  //   if (err) return next(err);
  //   res.json(posts);
  // });
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
// 수정 방식
// 1. 전체를 다 갖고 와서 req.body로 수정할 시 기존의 post를 삭제하고 다시 집어넣는 방법
// 2. 특정 부분만 고치는 경우 req.body가 아니라 어떤 인자를 이용해야하는지 고민
router.put("/modify/:id/:pname", function(req, res, next) {
  User.updateOne({
    "user_id": req.params.id,
    "posts.post_name": req.params.pname
  }, {
    $set: req.body
  }).exec(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

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

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

// Get All Users Info
router.get("/", function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// Get One User Info
router.get("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Get All Posts

// Get All Repositories

// Add User
router.post("/", function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Add Post

// Add Repository

// Update User

// Update Post

// Update Repository

// Delete User

// Delete Post

// Delete Repository

module.exports = router;

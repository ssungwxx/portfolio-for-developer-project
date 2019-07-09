var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");
var Repository = require("../model/Repository");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

// Get All Repositories Sort By Date

router.get("/", function(req, res, next) {
  User.find({})
    .select("repositories")
    .exec(function(err, users) {
      if (err) return next(err);
      res.json(users);
    });
});

// Get One Repository

// Update Repository

// Delete Repository

module.exports = router;

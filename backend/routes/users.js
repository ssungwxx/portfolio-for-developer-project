var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

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

// Add User
router.post("/", function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Update User
router.put("/:id", function(req, res, next) {
  User.findByIdAndUpdate(req.param.id, req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Delete User
router.delete("/:id", function(req, res) {
  User.remove({ _id: req.params.id }, function(err, user) {
    if (err) return res.status(500).json({ errer: "database failure" });

    res.status(204).end();
  });
});

// Get One User Info
router.get("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Add User
router.post("/", function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Update User
router.put("/:id", function(req, res, next) {
  User.findByIdAndUpdate(req.param.id, req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// Delete User
router.delete("/:id", function(req, res) {
  User.remove({ _id: req.params.id }, function(err, user) {
    if (err) return res.status(500).json({ errer: "database failure" });

    res.status(204).end();
  });
});

module.exports = router;

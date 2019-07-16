var express = require("express");
var router = express.Router();

// knex
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Login Authenticate
router.post("/login", (req, res) => {
  let token = jwt.sign(
    {
      user_id: req.body.user_id
    },
    secretObj.secret,
    {
      expiresIn: "5m"
    }
  );

  knex("user")
    .select("*")
    .where("user_id", req.body.user_id)
    .then(data => {
      if (req.body.user_pw == data[0].user_pw) {
        res.cookie("user", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        knex("user_log")
          .insert({
            user_id: req.body.user_id,
            user_token: token
          })
          .then();
        res.json({
          token: token
        });
      } else {
        res.json({
          token: "null"
        });
      }
    });
});

// Get All Users Info
router.get("/", (req, res) => {
  knex("user")
    .select("*")
    .then(data => res.json(data));
});

// Get One User Info
router.get("/:id", (req, res) => {
  knex("user")
    .select("*")
    .where("user_id", req.params.id)
    .then(data => res.json(data));
});

// Add User
router.post("/", (req, res) => {
  knex("user")
    .insert(req.body)
    .then(data => res.json(data));
});

// Update User
router.put("/:id", (req, res) => {
  knex("user")
    .where("user_id", req.params.id)
    .update(req.body)
    .then(data => res.json(data));
});
// Delete User
router.delete("/:id", (req, res) => {
  knex("user")
    .where("user_id", req.params.id)
    .delete(req.body)
    .then(data => res.json(data));
});

module.exports = router;

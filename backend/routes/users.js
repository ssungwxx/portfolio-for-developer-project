var express = require("express");
var router = express.Router();

// knex
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Login Authenticate
router.post("/login", (req, res) => {
  let token = jwt.sign({
      user_id: req.body.user_id
    },
    secretObj.secret, {
      expiresIn: "5m"
    }
  );

  let refresh_token = jwt.sign({
      token: req.body.user_id
    },
    secretObj.secret, {
      expiresIn: "1d"
    }
  );

  knex("users")
    .select("*")
    .where("user_id", req.body.user_id)
    .then(data => {
      if (req.body.user_pw == data[0].user_pw) {
        // user cookie 설정
        res.cookie("user", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        // user refresh cookir 설정
        res.cookie("refresh_user", refresh_token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true
        });
        // 로그인시 사용자마다 토큰 기록
        knex("user_logs")
          .insert({
            user_token: token
          })
          .then();
        res.json({
          token: token,
          refresh: refresh_token
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
  knex("users")
    .select("*")
    .then(data => res.json(data));
});

// Get One User Information
router.get("/:id", (req, res) => {
  knex("users")
    .count("* as cnt")
    .where("user_id", req.params.id)
    .then(data => res.json(data));
});

// Add User
router.post("/", (req, res) => {
  knex("users")
    .insert(req.body)
    .then(data => res.json({
      status: "1",
      code: "success"
    }))
    .catch(function(error) {
      res.json({
        status: "-1",
        code: error.code
      });
    });
});

// Update User
router.put("/:id", (req, res) => {
  knex("users")
    .where("user_id", req.params.id)
    .update(req.body)
    .then(data => res.json(data));
});

// Delete User
router.delete("/:id", (req, res) => {
  knex("users")
    .where("user_id", req.params.id)
    .delete(req.body)
    .then(data => res.json(data));
});

module.exports = router;

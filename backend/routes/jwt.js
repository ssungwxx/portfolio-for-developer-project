var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// get user's refresh token
router.get("/:user_id", (req, res) => {
    knex("users")
        .select("user_refresh_token")
        .where("user_id", req.params.user_id)
        .then(data => res.json(data));
});

module.exports = router;

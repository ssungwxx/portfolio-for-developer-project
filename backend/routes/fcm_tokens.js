var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get All fcm tokens
router.get("/", (req, res) => {
    knex("fcm_tokens")
        .select("*")
        .then(data => res.json(data));
});

// Insert One fcm token
router.post("/", (req, res) => {
    knex("fcm_tokens")
        .insert(req.body)
        .then(data => res.json(data));
});

module.exports = router;

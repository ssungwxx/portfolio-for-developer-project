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
        .count("fcm_token as cnt")
        .where("fcm_token", req.body.fcm_token)
        .then(data => {
            if (data[0].cnt == 0) {
                knex("fcm_tokens")
                    .insert(req.body)
                    .then(data => res.json(data));
            } else {
                res.json({
                    status: 400,
                    msg: "already existed"
                });
            }
        });
});

module.exports = router;

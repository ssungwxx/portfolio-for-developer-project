var express = require("express");
var router = express.Router();

// knex
const knex = require("knex")(require("../knexfile"));

// Get All replies
router.get("/", (req, res) => {
    knex("replies")
        .select("*")
        .then(data => res.json(data));
});

// Get post's replies
router.get("/:post_no", (req, res) => {
    knex("replies")
        .select("*")
        .where("post_no", req.params.post_no)
        .orderBy("reply_date", "desc")
        .then(data => res.json(data));
});

// insert reply
router.post("/", (req, res) => {
    knex("replies")
        .insert(req.body)
        .then(data => res.json(data));
});

// update reply
router.put("/", (req, res) => {
    knex("replies")
        .update(req.body)
        .where("reply_no", req.body.reply_no)
        .then(data => res.json(data));
});

// delete reply
router.delete("/:reply_no", (req, res) => {
    knex("replies")
        .delete()
        .where("reply_no", req.params.reply_no)
        .then(data => res.json(data));
});

module.exports = router;

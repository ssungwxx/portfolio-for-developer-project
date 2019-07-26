var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get all post's comments sorted by datetime
router.get("/", (req, res) => {
    knex("posts_comment")
        .select("*")
        .orderBy("pcom_date", "desc")
        .then(data => res.json(data));
});

// Get one post's comments sorted by datetime
router.get("/:post_no", (req, res) => {
    knex("posts_comment")
        .select("*")
        .where("post_no", req.params.post_no)
        .orderBy("")
        .then(data => res.json(data));
});

// Insert One comment
router.post("/", (req, res) => {
    knex("posts_comment")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One comment
router.put("/:pcom_no", (req, res) => {
    knex("posts_comment")
        .update(req.body)
        .where("pcom_no", req.params.pcom_no)
        .then(data => res.json(data));
});

// Delete One comment
router.delete("/:pcom_no", (req, res) => {
    knex("posts_comment")
        .delete()
        .where("pcom_no", req.params.pcom_no)
        .then(data => res.json(data));
});

module.exports = router;

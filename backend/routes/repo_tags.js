var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get all repo's tags sorted by rtag_name
router.get("/", (req, res) => {
    knex("repositories_tags")
        .select("*")
        .orderBy("rtag_name", "desc")
        .then(data => res.json(data));
});

// Get One repo's tags sorted by rtag_name
router.get("/:repo_no", (req, res) => {
    knex("repositories_tags")
        .select("*")
        .where("repo_no", req.params.repo_no)
        .orderBy("rtag_name", "desc")
        .then(data => res.json(data));
});

// Insert One repo's tag
router.post("/", (req, res) => {
    knex("repositories_tags")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One repo's tag
router.put("/:rtag_no", (req, res) => {
    knex("repositories_tags")
        .insert(req.body)
        .where("rtag_no", req.params.rtag_no)
        .then(data => res.json(data));
});

// Delete One repo's tag
router.delete("/:rtag_no", (req, res) => {
    knex("repositories_tags")
        .delete()
        .where("rtag_no", req.params.rtag_no)
        .then(data => res.json());
});

module.exports = router;

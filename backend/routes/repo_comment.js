var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get all repo's comments sorted by datetime
router.get("/", (req, res) => {
    knex("repositories_comment")
        .select("*")
        .orderBy("rcom_date", "desc")
        .then(data => res.json(data));
});

// Get one repo's comments sorted by datetime
router.get("/:user_id", (req, res) => {
    knex("repositories_comment")
        .select("*")
        .where("user_id", req.params.user_id)
        .orderBy("rcom_date", "desc")
        .then(data => res.json(data));
});

// Delete one comment
router.delete("/:rcom_no", (req, res) => {
    knex("repositories_comment")
        .delete()
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});

// Insert One comment
router.post("/", (req, res) => {
    knex("repositories_comment")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One comment
router.put("/:rcom_no", (req, res) => {
    knex("repositories_comment")
        .insert(req.body)
        .then(data => res.json(data));
});

module.exports = router;

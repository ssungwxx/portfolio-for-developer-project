var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get All Repositories
router.get("/", (req, res) => {
    knex("repositories")
        .select("*")
        .orderBy("repo_date", "desc")
        .then(data => res.json(data));
});

// Get One's repositories
router.get("/:user_id", (req, res) => {
    knex("repositories")
        .select("*")
        .where("user_id", req.params.user_id)
        .orderBy("repo_date", "desc")
        .then(data => res.json(data));
});

// Inser repository
router.post("/", (req, res) => {
    knex("repositories")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update repository
router.put("/", (req, res) => {
    knex("repositories")
        .update(req.body)
        .then(data => res.json(data));
});

// delete repository
router.delete("/:repo_no", (req, res) => {
    knex("repositories")
        .delete()
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});
module.exports = router;

var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));
const translate = require("google-translate-api");

// Get All Repositories
router.get("/", (req, res) => {
  knex("repository")
    .select("*")
    .orderBy("repository_date", "desc")
    .then(data => res.json(data));
});

// Get One Repository
router.get("/:id", (req, res) => {
  knex("repository")
    .select("*")
    .where("user_id", req.params.id)
    .then(data => res.json(data));
});

// Insert Repository
router.post("/", (req, res) => {
  knex("repository")
    .insert(req.body)
    .then(data => res.json(data));
});

// Update Repository
router.put("/:no", (req, res) => {
  knex("repository")
    .update(req.body)
    .where("repository_no", req.params.no)
    .then(data => res.json(data));
});

// Delete Repository
router.delete("/:no", (req, res) => {
  knex("repository")
    .delete(req.body)
    .where("repository_no", req.params.no)
    .then(data => res.json(data));
});

module.exports = router;

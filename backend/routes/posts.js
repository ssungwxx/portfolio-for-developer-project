var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get all posts sorted by datetime
router.get("/", (req, res) => {
  knex("post")
    .select("*")
    .then(data => res.json(data));
});

// Get one detailed post
router.get("/:id", (req, res) => {
  knex("post")
    .select("*")
    .where("user_id", req.params.id)
    .then(data => res.json(data));
});

// Add new post
router.post("/", (req, res) => {
  knex("post")
    .insert(req.body)
    .then(data => res.json(data));
});

// Delete selected post
router.delete("/:no", (req, res) => {
  console.log(req.params.no);
  knex("post")
    .delete(req.body)
    .where("post_no", req.params.no)
    .then(data => res.json(data));
});

// Modify selected post
router.put("/:no", (req, res) => {
  knex("post")
    .update(req.body)
    .where("post_no", req.params.no)
    .then(data => res.json(data));
});

module.exports = router;

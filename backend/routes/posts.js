var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get all posts sorted by datetime
router.get("/test", (req, res) => {
  knex("posts")
    .select("*")
    .orderBy("post_date", "desc")
    .then(data => res.json(data));
});

// Get all posts sorted by datetime
router.get("/", (req, res) => {
  knex("posts")
    .select("*")
    .orderBy("post_date", "desc")
    .then(data => res.json(data));
});

// Get one detailed post
router.get("/:id", (req, res) => {
  knex("posts")
    .select("*")
    .where("user_id", req.params.id)
    .then(data => res.json(data));
});

// Add new post
router.post("/", (req, res) => {
  knex("posts")
    .insert(req.body)
    .then(data => res.json(data));
});

// Delete selected post
router.delete("/:no", (req, res) => {
  console.log(req.params.no);
  knex("posts")
    .delete(req.body)
    .where("post_no", req.params.no)
    .then(data => res.json(data));
});

// Modify selected post
router.put("/:no", (req, res) => {
  knex("posts")
    .update(req.body)
    .where("post_no", req.params.no)
    .then(data => res.json(data));
});

module.exports = router;

var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get All Users Info
router.get("/", (req, res) => {
  knex("user")
    .select("*")
    .then(data => res.json(data));
});

// Get One User Info
router.get("/:id", (req, res) => {
  knex("user")
    .select("*")
    .where("user_id", req.params.id)
    .then(data => res.json(data));
});

// Add User
router.post("/", (req, res) => {
  knex("user")
    .insert(req.body)
    .then(data => res.json(data));
});

// Update User
router.put("/:id", (req, res) => {
  knex("user")
    .where("user_id", req.params.id)
    .update(req.body)
    .then(data => res.json(data));
});
// Delete User
router.delete("/:id", (req, res) => {
  knex("user")
    .where("user_id", req.params.id)
    .delete(req.body)
    .then(data => res.json(data));
});

module.exports = router;

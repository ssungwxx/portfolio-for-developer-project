var express = require("express");
var router = express.Router();

// knex
const knex = require("knex")(require("../knexfile"));

// Get All Logs
router.get("/", (req, res) => {
  knex("web_logs")
    .select("*")
    .then(data => res.json(data));
});

// Insert Log
router.post("/:path", (req, res) => {
  knex("web_logs")
    .insert({ path: req.params.path })
    .then(data => res.json(data));
});

module.exports = router;

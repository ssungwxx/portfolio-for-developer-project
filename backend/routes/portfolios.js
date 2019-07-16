var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get All Repositories
router.get("/", (req, res) => {
  knex("portfolios")
    .select("*")
    .orderBy("portfolio_date", "desc")
    .then(data => res.json(data));
});

// Get One Repository
router.get("/:id", (req, res) => {
  knex("portfolios")
    .select("*")
    .where("portfolio_no", req.params.id)
    .then(data => res.json(data));
});

// Insert Repository
router.post("/", (req, res) => {
  knex("portfolios")
    .insert(req.body)
    .then(data => res.json(data));
});

// Update Repository
router.put("/:no", (req, res) => {
  knex("portfolios")
    .update(req.body)
    .where("portfolio_no", req.params.no)
    .then(data => res.json(data));
});

// Delete Repository
router.delete("/:no", (req, res) => {
  knex("portfolios")
    .delete(req.body)
    .where("portfolio_no", req.params.no)
    .then(data => res.json(data));
});

module.exports = router;

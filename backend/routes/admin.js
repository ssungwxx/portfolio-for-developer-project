var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

var crypto = require("crypto");

/*users*/
// Get All Users
router.get("/users", (req, res) => {
    knex("users")
        .select("*")
        .then(data => res.json(data));
});

// Get One User
router.get("/users/:id", (req, res) => {
    knex("users")
        .select("*")
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

// Insert One User
router.post("/users", (req, res) => {
    knex("users")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One User
router.put("/users/:id", (req, res) => {
    knex("users")
        .update(req.body)
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

// Delete One User
router.delete("/users/:id", (req, res) => {
    knex("users")
        .delete()
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

/*repositories*/
// Get All Repositories
router.get("/repositories", (req, res) => {
    knex("repositories")
        .select("*")
        .then(data => res.json(data));
});

// Get One's Repositories
router.get("/repositories/user/:id", (req, res) => {
    knex("repositories")
        .select("*")
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

// Get One Repository
router.get("/repositories/:repo_no", (req, res) => {
    knex("repositories")
        .select("*")
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});

// Insert One Repository
router.post("/repositories", (req, res) => {
    knex("repositories")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One Repository
router.put("/repositories/:repo_no", (req, res) => {
    knex("repositories")
        .update(req.body)
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});

// Delete One Repository
router.delete("/repositories/:repo_no", (req, res) => {
    knex("repositories")
        .delete()
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});

/*posts*/
// Get All Posts
router.get("/posts", (req, res) => {
    knex("posts")
        .select("*")
        .then(data => res.json(data));
});

// Get Post count
router.get("/posts/count", (req, res) => {
    knex("posts")
        .count("post_no as cnt")
        .then(data => res.json(data));
});

// Get One's Post
router.get("/posts/user/:id", (req, res) => {
    knex("posts")
        .select("*")
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

// Get One Post
router.get("/posts/:post_no", (req, res) => {
    knex("posts")
        .select("*")
        .where("post_no", req.params.post_no)
        .then(data => res.json(data));
});

// Insert One Post
router.post("/posts", (req, res) => {
    knex("posts")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One Post
router.put("/posts/:post_no", (req, res) => {
    knex("posts")
        .update(req.body)
        .where("post_no", req.params.post_no)
        .then(data => res.json(data));
});

// Delete One Post
router.delete("/posts/:post_no", (req, res) => {
    knex("posts")
        .delete()
        .where("post_no", req.params.post_no)
        .then(data => res.json(data));
});

/*repo comments*/
// Get All Repository's comments
router.get("/repo_comment", (req, res) => {
    knex("repositories_comment")
        .select("*")
        .then(data => res.json(data));
});

// Get One Repository's comments
router.get("/repo_comment/:repo_no", (req, res) => {
    knex("repositories_comment")
        .select("*")
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});

// Insert One Repository's comment
router.post("/repo_comment", (req, res) => {
    knex("repositories_comment")
        .insert(req.body)
        .then(data => res.json(data));
});

// Update One Repository's comment
router.put("/repo_comment/:rcom_no", (req, res) => {
    knex("repositories_comment")
        .update(req.body)
        .where("rcom_no", req.params.rcom_no)
        .then(data => res.json(data));
});

// Delete One Repository's comment
router.delete("/repo_comment/all/:repo_no", (req, res) => {
    knex("repositories_comment")
        .delete()
        .where("repo_no", req.params.repo_no)
        .then(data => res.json(data));
});

// Delete One Repository's comments
router.delete("/repo_comment/:rcom_no", (req, res) => {
    knex("repositories_comment")
        .delete()
        .where("rcom_no", req.params.rcom_no)
        .then(data => res.json(data));
});

/*post comments*/
// Get All Post's comments
router.get("/post_comment", (req, res) => {
    knex("posts_comment")
        .select("*")
        .then(data => res.json(data));
});

// Get One Post's comments
router.get("/post_comment/:post_no", (req, res) => {
    knex("posts_comment")
        .select("*")
        .where("post_no", req.params.post_no)
        .then(data => res.json(data));
});

// Insert One Post's comment
router.post("/post_comment", (req, res) => {
    knex("posts_comment")
        .insert(body)
        .then(data => res.json(data));
});

// Update One Post's comment
router.put("/post_comment/:pcom_no", (req, res) => {
    knex("posts_comment")
        .update(req.body)
        .where("pcom_no", req.params.pcom_no)
        .then(data => res.json(data));
});

// Delete One Post's comment
router.delete("/post_comment/all/:post_no", (req, res) => {
    knex("posts_comment")
        .delete()
        .where("post_no", req.params.post_no)
        .then(data => res.json(data));
});

// Delete One Post's comments
router.delete("/post_comment/:pcom_no", (req, res) => {
    knex("posts_comment")
        .delete("*")
        .where("pcom_no", req.params.pcom_no)
        .then(data => res.json(data));
});

/*WebLog*/
// Get All Web Logs
router.get("/web_log", (req, res) => {
    knex("web_logs")
        .select("*")
        .then(data => res.json(data));
});

// Get Web Logs Count
router.get("/web_log/count", (req, res) => {
    knex("web_logs")
        .count("wlog_no as cnt")
        .then(data => res.json(data));
});

module.exports = router;

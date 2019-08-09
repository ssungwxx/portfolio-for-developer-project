var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Get all posts sorted by datetime
router.get("/", (req, res) => {
    knex("posts")
        .select("*")
        .orderBy("post_date", "desc")
        .then(data => res.json(data));
});

// Get count(*)
router.get("/count", (req, res) => {
    knex("posts")
        .count("post_no as cnt")
        .then(data => res.json(data));
});

// Get one post's count
router.get("/count/:id", (req, res) => {
    knex("posts")
        .select("post_cnt")
        .where("post_no", req.params.id)
        .then(data => res.json(data));
});

// Get one detailed post
router.get("/:id", (req, res) => {
    knex("posts")
        .select("*")
        .where("post_no", req.params.id)
        .then(data => res.json(data));
});

// Get One's posts
router.get("/user/:id", (req, res) => {
    knex("posts")
        .select("*")
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

// Add new post
router.post("/", (req, res) => {
    // 헤더에 jwt가 넘어오지 않을 때
    if (!req.headers.jwt) {
        res.json({
            status: 400,
            msg: "no jwt in session"
        });
        return;
    }

    // Token 검증
    try {
        token = jwt.verify(req.headers.jwt, secretObj.secret);
    } catch {
        res.json({
            status: 400,
            msg: "expired token"
        });
        return;
    }

    knex("posts")
        .insert(req.body)
        .then(data =>
            res.json({
                status: 200,
                msg: "success"
            })
        )
        .catch(err =>
            res.json({
                status: 400,
                msg: err
            })
        );
});

// Delete selected post
router.delete("/:no", (req, res) => {
    // 헤더에 jwt가 넘어오지 않을 때
    if (!req.headers.jwt) {
        res.json({
            status: 400,
            msg: "no jwt in session"
        });
        return;
    }

    // Token 검증
    try {
        token = jwt.verify(req.headers.jwt, secretObj.secret);
    } catch {
        res.json({
            status: 400,
            msg: "expired token"
        });
        return;
    }

    knex("posts")
        .delete()
        .where("post_no", req.params.no)
        .then(data =>
            res.json({
                status: 200,
                msg: "success"
            })
        )
        .catch(err =>
            res.json({
                status: 400,
                msg: err
            })
        );
});

// Modify selected post
router.put("/:no", (req, res) => {
    // 헤더에 jwt가 넘어오지 않을 때
    if (!req.headers.jwt) {
        res.json({
            status: 400,
            msg: "no jwt in session"
        });
        return;
    }

    // Token 검증
    try {
        token = jwt.verify(req.headers.jwt, secretObj.secret);
    } catch {
        res.json({
            status: 400,
            msg: "expired token"
        });
        return;
    }

    knex("posts")
        .update(req.body)
        .where("post_no", req.params.no)
        .then(data =>
            res.json({
                status: 200,
                msg: "success"
            })
        )
        .catch(err =>
            res.json({
                status: 400,
                msg: err
            })
        );
});

module.exports = router;

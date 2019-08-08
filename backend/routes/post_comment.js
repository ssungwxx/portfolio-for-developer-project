var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Get all post's comments sorted by datetime
router.get("/", (req, res) => {
    knex("posts_comment")
        .select("*")
        .orderBy("pcom_date", "desc")
        .then(data => res.json(data));
});

// Get one post's comments sorted by datetime
router.get("/:post_no", (req, res) => {
    knex("posts_comment")
        .select("*")
        .where("post_no", req.params.post_no)
        .orderBy("pcom_date", "desc")
        .then(data => res.json(data));
});

// Insert One comment
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

    knex("posts_comment")
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

// Update One comment
router.put("/:pcom_no", (req, res) => {
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

    knex("posts_comment")
        .update(req.body)
        .where("pcom_no", req.params.pcom_no)
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

// Delete One comment
router.delete("/:pcom_no", (req, res) => {
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

    knex("posts_comment")
        .delete()
        .where("pcom_no", req.params.pcom_no)
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

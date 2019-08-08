var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Get all repo's comments sorted by datetime
router.get("/", (req, res) => {
    knex("repositories_comment")
        .select("*")
        .orderBy("rcom_date", "desc")
        .then(data => res.json(data));
});

// Get one repo's comments sorted by datetime
router.get("/:user_id", (req, res) => {
    knex("repositories_comment")
        .select("*")
        .where("user_id", req.params.user_id)
        .orderBy("rcom_date", "desc")
        .then(data => res.json(data));
});

// Delete one comment
router.delete("/:rcom_no", (req, res) => {
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

    knex("repositories_comment")
        .delete()
        .where("repo_no", req.params.repo_no)
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

    knex("repositories_comment")
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
router.put("/:rcom_no", (req, res) => {
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

    knex("repositories_comment")
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

module.exports = router;

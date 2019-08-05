var express = require("express");
var router = express.Router();

// knex
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// User model
var User = require("../models/User");

// crypto
var crypto = require("crypto");

// crypto register
router.post("/", (req, res) => {
    if (!req.body.user_pw) {
        res.json({
            status: "400",
            msg: "no data"
        });
        return;
    }
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(
            req.body.user_pw,
            buf.toString("base64"),
            157913, // hash 함수 반복횟수
            64,
            "sha512",
            (err, key) => {
                User.user_id = req.body.user_id;
                User.user_pw = key.toString("base64");
                User.user_salt = buf.toString("base64");
                User.user_name = req.body.user_name;
                User.user_email = req.body.user_email;

                if (User.user_id && User.user_pw && User.user_name) {
                    knex("users")
                        .insert(User)
                        .then(data =>
                            res.json({
                                status: 200,
                                msg: "success"
                            })
                        )
                        .catch(err =>
                            res.json({
                                status: 400,
                                msg: "overlap id"
                            })
                        );
                } else {
                    res.json({
                        status: 400,
                        msg: "no data"
                    });
                }
            }
        );
    });
});

//Login
router.post("/login", (req, res) => {
    // 실험용 토큰 (Access Token)
    let token = jwt.sign(
        {
            user_id: req.body.user_id
        },
        secretObj.secret,
        {
            expiresIn: "5m"
        }
    );

    let refresh_token = jwt.sign(
        {
            user_id: req.body.user_id
        },
        secretObj.refresh,
        {
            expiresIn: "1d"
        }
    );

    knex("users")
        .select("user_salt", "user_pw")
        .where("user_id", req.body.user_id)
        .then(data => {
            if (data[0] == null) {
                res.json({
                    status: 400,
                    msg: "wrong id"
                });
            } else {
                crypto.pbkdf2(
                    req.body.user_pw,
                    data[0].user_salt,
                    157913,
                    64,
                    "sha512",
                    (err, key) => {
                        if (data[0].user_pw == key.toString("base64")) {
                            res.json({
                                status: 200,
                                msg: "success",
                                token: token
                            });

                            knex("user_login_tokens")
                                .insert({
                                    user_id: req.body.user_id,
                                    tk_refresh: refresh_token
                                })
                                .then();
                        } else {
                            res.json({
                                status: 400,
                                msg: "wrong password"
                            });
                        }
                    }
                );
            }
        });
});

// Get All Users Info
router.get("/", (req, res) => {
    knex("users")
        .select("*")
        .then(data => res.json(data));
});

// Get User Search
router.get("/search/:id", (req, res) => {
    knex("users")
        .where("user_id", "like", req.params.id + "%")
        .limit(5)
        .orderBy("user_id", "desc")
        .whereIn("user_grade", [0, 5])
        .then(data => res.json(data));
});

// Get One User Information
router.get("/:id", (req, res) => {
    knex("users")
        .select("*")
        .where("user_id", req.params.id)
        .then(data => res.json(data));
});

// Update Password
router.put("/", (req, res) => {
    let token = jwt.verify(req.headers.jwt, secretObj.secret);

    if (token.exp < Date.now()) {
        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(
                req.body.user_pw,
                buf.toString("base64"),
                157913, // hash 함수 반복횟수
                64,
                "sha512",
                (err, key) => {
                    User.user_pw = key.toString("base64");
                    User.user_salt = buf.toString("base64");

                    if (User.user_pw) {
                        knex("users")
                            .where("user_id", token.user_id)
                            .update(User)
                            .then(data =>
                                res.json({
                                    status: 200,
                                    msg: "success"
                                })
                            )
                            .catch(err =>
                                res.json({
                                    status: 400,
                                    msg: "error"
                                })
                            );
                    } else {
                        res.json({
                            status: 400,
                            msg: "no data"
                        });
                    }
                }
            );
        });
    } else {
        res.json({
            status: 400,
            msg: "expired token"
        });
    }
});

// Delete User
router.delete("/:id", (req, res) => {
    knex("users")
        .where("user_id", req.params.id)
        .delete(req.body)
        .then(data => res.json(data));
});

module.exports = router;

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
                        console.log(key.toString("base64"));
                        console.log(data[0].user_pw);
                        if (data[0].user_pw == key.toString("base64")) {
                            res.json({
                                status: 200,
                                msg: "success"
                            });
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

// Login Authenticate by pwa
/*
router.post("/login", (req, res) => {
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
            token: req.body.user_id
        },
        secretObj.secret,
        {
            expiresIn: "1d"
        }
    );

    knex("users")
        .select("*")
        .where("user_id", req.body.user_id)
        .then(data => {
            if (req.body.user_pw == data[0].user_pw) {
                // user cookie 설정
                res.cookie("user", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });
                // user refresh cookir 설정
                res.cookie("refresh_user", refresh_token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });
                // 로그인시 사용자마다 토큰 기록
                knex("user_logs")
                    .insert({
                        user_token: token
                    })
                    .then();
                res.json({
                    token: token,
                    refresh: refresh_token,
                    grade: data[0].user_grade
                });
            } else {
                res.json({
                    token: null,
                    refresh: null,
                    grade: null
                });
            }
        });
});
*/

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
router.put("/:id", (req, res) => {
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
                        .where("user_id", req.params.id)
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
});

// Delete User
router.delete("/:id", (req, res) => {
    knex("users")
        .where("user_id", req.params.id)
        .delete(req.body)
        .then(data => res.json(data));
});

module.exports = router;

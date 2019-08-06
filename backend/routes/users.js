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
    // 사용자 세션 저장용 토큰
    let token = jwt.sign(
        {
            user_id: req.body.user_id
        },
        secretObj.secret,
        {
            expiresIn: "5m"
        }
    );
    // 서버 DB저장용 토큰
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

// Update User
router.put("/", (req, res) => {
    // 헤더에 jwt가 넘어오지 않을 때
    if (!req.headers.jwt) {
        res.json({
            status: 400,
            msg: "no jwt in session"
        });
        return;
    }

    let token;
    // 헤더에있는 토큰 검증
    try {
        token = jwt.verify(req.headers.jwt, secretObj.secret);
    } catch {
        token = {
            user_id: req.body.user_id,
            exp: -1
        };
    }

    async function refresh() {
        const result = await getRefreshToken(token.user_id);

        try {
            refresh_token = jwt.verify(result, secretObj.refresh);
            const new_token = jwt.sign(
                {
                    user_id: req.body.user_id
                },
                secretObj.secret,
                {
                    expiresIn: "5m"
                }
            );
            token = jwt.verify(new_token, secretObj.secret);
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
                        User.user_grade = req.body.user_grade;
                        User.user_gitId = req.body.user_gitId;
                        User.user_gitAdd = req.body.user_gitAdd;
                        User.user_gitToken = req.body.user_gitToken;
                        User.user_email = req.body.user_email;
                        User.user_aboutMe = req.body.user_aboutMe;
                        User.user_profile = req.body.user_profile;

                        if (User.user_pw) {
                            knex("users")
                                .where("user_id", token.user_id)
                                .update(User)
                                .then(data =>
                                    res.json({
                                        status: 200,
                                        msg: "success/new_token",
                                        jwt: new_token
                                    })
                                )
                                .catch(err =>
                                    res.json({
                                        status: 400,
                                        msg: "error"
                                    })
                                );
                        }
                    }
                );
            });
        } catch {
            token.exp = refresh.exp;
        }
    }

    if (token.exp == -1) {
        refresh();
    } else if (token.exp < Date.now) {
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
                    User.user_grade = req.body.user_grade;
                    User.user_gitId = req.body.user_gitId;
                    User.user_gitAdd = req.body.user_gitAdd;
                    User.user_gitToken = req.body.user_gitToken;
                    User.user_email = req.body.user_email;
                    User.user_aboutMe = req.body.user_aboutMe;
                    User.user_profile = req.body.user_profile;

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

router.get("/test/:id", (req, res) => {
    async function test() {
        const result = await getRefreshToken("ykk2006");
        res.json(result);
    }
    test();
});

async function getRefreshToken(user_id) {
    return await knex("user_login_tokens")
        .select("tk_refresh")
        .where("user_id", user_id)
        .orderBy("tk_no", "desc")
        .limit("1")
        .then(data => (result = data[0].tk_refresh));
}

module.exports = router;

var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Get User's id
router.get("/user/id", (req, res) => {
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
        res.json({
            status: 400,
            msg: "expired token"
        });
        return;
    }

    res.json(token.user_id);
});

// Get User's id
router.get("/user/grade", (req, res) => {
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
        res.json({
            status: 400,
            msg: "expired token"
        });
        return;
    }

    res.json(token.user_grade);
});

// get user's refresh token
router.get("/:user_id", (req, res) => {
    knex("users")
        .select("user_refresh_token")
        .where("user_id", req.params.user_id)
        .then(data =>
            res.json(
                jwt.verify(data[0].user_refresh_token, secretObj.refresh).exp
            )
        );
});

// get new access token
router.post("/:user_id", (req, res) => {
    // 사용자 세션 저장용 토큰
    let token = jwt.sign(
        {
            user_id: req.body.user_id,
            user_id: req.body.user_grade
        },
        secretObj.secret,
        {
            expiresIn: "5m"
        }
    );
    res.json(token);
});

// modify refresh token to ""
router.put("/:user_id", (req, res) => {
    knex("users")
        .update("user_refresh_token", "")
        .where("user_id", req.params.user_id)
        .then(data =>
            res.json({
                status: 200,
                msg: "success"
            })
        );
});

// check access token expired
router.post("/check/:user_id", (req, res) => {
    try {
        let token = jwt.verify(req.body.jwt, secretObj.secret);
        if (req.params.user_id == token.user_id) {
            res.json({
                status: 200,
                msg: "success"
            });
        } else {
            res.json({
                status: 400,
                msg: "unmatched userId"
            });
        }
    } catch {
        res.json({
            status: 400,
            msg: "expired token"
        });
    }
});

module.exports = router;

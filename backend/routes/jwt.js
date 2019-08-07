var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

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
            user_id: req.body.user_id
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

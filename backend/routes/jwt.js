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
        .then(data => res.json(data));
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

module.exports = router;

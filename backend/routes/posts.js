var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// DB RefreshToken 가져오기
async function getRefreshToken(user_id) {
    return await knex("user_login_tokens")
        .select("tk_refresh")
        .where("user_id", user_id)
        .orderBy("tk_no", "desc")
        .limit("1")
        .then(data => (result = data[0].tk_refresh));
}

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
        .where("user_id", req.params.id)
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
    // Token Refresh 함수
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

            knex("posts")
                .insert(req.body)
                .then(data =>
                    res.json({
                        status: 200,
                        msg: "success",
                        jwt: new_token
                    })
                );
        } catch {
            token.exp = refresh.exp;
        }
    }

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
        token = {
            user_id: req.body.user_id,
            exp: -1
        };
    }

    if ((token.exp = -1)) {
        refresh();
    } else if (token.exp < Date.now) {
        knex("posts")
            .insert(req.body)
            .then(data =>
                res.json({
                    status: 200,
                    msg: "success"
                })
            );
    } else {
        res.json({
            status: 400,
            msg: "error"
        });
    }
});

// Delete selected post
router.delete("/:no", (req, res) => {
    // Token Refresh 함수
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

            knex("posts")
                .delete()
                .where("post_no", req.params.no)
                .then(data =>
                    res.json({
                        status: 200,
                        msg: "success",
                        jwt: new_token
                    })
                );
        } catch {
            token.exp = refresh.exp;
        }
    }

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
        token = {
            user_id: req.body.user_id,
            exp: -1
        };
    }

    if ((token.exp = -1)) {
        refresh();
    } else if (token.exp < Date.now) {
        knex("posts")
            .delete()
            .where("post_no", req.params.no)
            .then(data =>
                res.json({
                    status: 200,
                    msg: "success"
                })
            );
    } else {
        res.json({
            status: 400,
            msg: "error"
        });
    }
});

// Modify selected post
router.put("/:no", (req, res) => {
    // Token Refresh 함수
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

            knex("posts")
                .update(req.body)
                .where("post_no", req.params.no)
                .then(data =>
                    res.json({
                        status: 200,
                        msg: "success",
                        jwt: new_token
                    })
                );
        } catch {
            token.exp = refresh.exp;
        }
    }

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
        token = {
            user_id: req.body.user_id,
            exp: -1
        };
    }

    if ((token.exp = -1)) {
        refresh();
    } else if (token.exp < Date.now) {
        knex("posts")
            .update(req.body)
            .where("post_no", req.params.no)
            .then(data =>
                res.json({
                    status: 200,
                    msg: "success"
                })
            );
    } else {
        res.json({
            status: 400,
            msg: "error"
        });
    }
});

module.exports = router;

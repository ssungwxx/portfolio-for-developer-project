var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

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

            knex("users")
                .where("user_id", req.body.id)
                .delete()
                .then(data =>
                    res.json({
                        status: 200,
                        msg: "success"
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
        knex("posts_comment")
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

// Update One comment
router.put("/:pcom_no", (req, res) => {
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

            knex("users")
                .where("user_id", req.body.id)
                .delete()
                .then(data =>
                    res.json({
                        status: 200,
                        msg: "success"
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
        knex("posts_comment")
            .update(req.body)
            .where("pcom_no", req.params.pcom_no)
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

// Delete One comment
router.delete("/:pcom_no", (req, res) => {
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

            knex("users")
                .where("user_id", req.body.id)
                .delete()
                .then(data =>
                    res.json({
                        status: 200,
                        msg: "success"
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
        knex("posts_comment")
            .delete()
            .where("pcom_no", req.params.pcom_no)
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

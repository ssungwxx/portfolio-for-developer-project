var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile"));

var request = require("request");

// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

// Get All Repositories
router.get("/", (req, res) => {
    knex("repositories")
        .select("*")
        .orderBy("repo_createdDate", "desc")
        .then(data => res.json(data));
});

// Count All Repositories
router.get("/count", (req, res) => {
    knex("repositories")
        .count("repo_no as cnt")
        .then(data => res.json(data));
});

// Get One's repositories
router.get("/:user_id", (req, res) => {
    knex("repositories")
        .select("*")
        .where("user_id", req.params.user_id)
        .orderBy("repo_createdDate", "desc")
        .then(data => res.json(data));
});

// Inser repository
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

    knex("repositories")
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

// Update repository
router.put("/", (req, res) => {
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

    knex("repositories")
        .update(req.body)
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

// delete repository
router.delete("/:repo_no", (req, res) => {
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

    knex("repositories")
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

// Get User's Repositoris and Insert DB
router.post("/repos", (req, res) => {
    var data;
    var result = [];
    request(
        req.body.user_gitAdd +
            "/api/v4/users/" +
            req.body.user_gitId +
            "/projects",
        {
            headers: {
                "Private-Token": req.body.user_gitToken
            }
        },
        (err, response, body) => {
            if (res.statusCode == 200) {
                data = response.body;
                data = JSON.parse(data);
                for (let idx = 0; idx < data.length; idx++) {
                    result[idx] = {
                        user_id: req.body.user_id,
                        repo_title: data[idx].name,
                        repo_id: data[idx].id,
                        repo_add: data[idx].web_url,
                        repo_id: data[idx].id,
                        repo_recentDate:
                            data[idx].last_activity_at.slice(0, 10) +
                            " " +
                            data[idx].last_activity_at.slice(11, 19),
                        repo_createdDate:
                            data[idx].created_at.slice(0, 10) +
                            " " +
                            data[idx].created_at.slice(11, 19)
                    };

                    // 동일 repositories 삭제
                    /*
                    knex("repositories")
                        .delete()
                        .where({
                            user_id: result[idx].user_id,
                            user_gitId: result[idx].repo_id,
                            repo_title: result[idx].repo_title
                        })
                        .then();
                        */
                }

                // 새로운 repositories 등록
                knex("repositories")
                    .insert(result)
                    .then(data =>
                        res.json({
                            status: 200,
                            msg: "success"
                        })
                    );

                //res.json(result);
            } else {
                res.json({
                    status: 400,
                    msg: "fail"
                });
            }
        }
    );
});

module.exports = router;

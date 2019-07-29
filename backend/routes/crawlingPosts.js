var express = require("express");
var router = express.Router();

var request = require("request");
var client = require("cheerio-httpcli");

let url = "https://kim6394.tistory.com";

var param = {};

router.get("/", (req, res) => {
    let result = [];

    client.fetch(url, {}, function(err, $, response, body) {
        var list = $(".entry");

        list.each(function() {
            result.push({
                title: $(this)
                    .find(".article-top")
                    .text()
                    .replace(/\r\n\t/g, ""),
                content: $(this)
                    .find(".tt_article_useless_p_margin")
                    .text()
                    .replace(/\r\n\t/g, "")
            });
        });
        res.json(result);
    });
});

module.exports = router;
